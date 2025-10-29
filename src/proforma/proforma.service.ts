import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProformaDto } from './dto/create-proforma.dto';
import { UpdateProformaDto } from './dto/update-proforma.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proforma } from './entities/proforma.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { TramiteSeguro } from 'src/tramite-seguro/entities/tramite-seguro.entity';
import { Consecutivo } from 'src/consecutivo/entities/consecutivo.entity';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';
import { ConsecutivoService } from 'src/consecutivo/consecutivo.service';

@Injectable()
export class ProformaService {
  private readonly logger = new Logger('ProformaService');

  constructor(
    @InjectRepository(Proforma)
    private readonly proformaRepository: Repository<Proforma>,
    @InjectRepository(TramiteSeguro)
    private readonly tramiteSeguroRepository: Repository<TramiteSeguro>,
    @InjectRepository(Consecutivo)
    private readonly consecutivoRepository: Repository<Consecutivo>,
    private readonly consecutivoService: ConsecutivoService,
  ) {}

  async create(createProformaDto: CreateProformaDto) {
    try {
      const { idTramiteSeguro, idConsecutivo, ...proformaData } =
        createProformaDto;

      const tramiteSeguro = await findEntityOrFail(
        this.tramiteSeguroRepository,
        { idTramiteSeguro },
        'El trámite de seguro no fue encontrado o no existe',
      );

      const consecutivo = await findEntityOrFail(
        this.consecutivoRepository,
        { idConsecutivo },
        'El consecutivo no fue encontrado o no existe',
      );

      const codigoProforma =
        await this.consecutivoService.obtenerSiguienteConsecutivo('PROFORMA');

      const nuevaProforma = this.proformaRepository.create({
        ...proformaData,
        codigoProforma,
        tramiteSeguro,
        consecutivo,
      });

      const proformaGuardada =
        await this.proformaRepository.save(nuevaProforma);

      return await this.proformaRepository.findOne({
        where: { idProforma: proformaGuardada.idProforma },
        relations: ['tramiteSeguro', 'consecutivo', 'lineas'],
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const proformas = await this.proformaRepository.find({
      take: limit,
      skip: offset,
      relations: ['tramiteSeguro'],
    });

    return proformas;
  }

  async findOne(id: number) {
    const proforma = await this.proformaRepository.findOne({
      where: { idProforma: id },
      relations: [
        'tramiteSeguro',
        'tramiteSeguro.vehiculo',
        'tramiteSeguro.cliente',
        'tramiteSeguro.aseguradora',
        'consecutivo',
        'lineas',
        'lineas.item',
      ],
    });

    if (!proforma) {
      throw new NotFoundException(`La proforma con id ${id} no fue encontrada`);
    }

    return proforma;
  }

  async update(id: number, updateProformaDto: UpdateProformaDto) {
    const { ...toUpdate } = updateProformaDto;

    const proforma = await this.proformaRepository.preload({
      idProforma: id,
      ...toUpdate,
    });

    if (!proforma) {
      throw new NotFoundException(`La proforma con id ${id} no fue encontrada`);
    }

    return this.proformaRepository.save(proforma);
  }

  async remove(id: number) {
    const proforma = await this.findOne(id);
    await this.proformaRepository.remove(proforma!);
  }
}
