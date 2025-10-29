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
import { Moneda } from 'src/moneda/entities/moneda.entity';
import { Impuesto } from 'src/impuesto/entities/impuesto.entity';

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
    @InjectRepository(Moneda)
    private readonly monedaRepository: Repository<Moneda>,
    @InjectRepository(Impuesto)
    private readonly impuestoRepository: Repository<Impuesto>,
    private readonly consecutivoService: ConsecutivoService,
  ) {}

  async create(createProformaDto: CreateProformaDto) {
    try {
      const {
        idTramiteSeguro,
        idConsecutivo,
        idMoneda,
        idImpuesto,
        fecha,
        ...proformaData
      } = createProformaDto;

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

      const moneda = await findEntityOrFail(
        this.monedaRepository,
        { idMoneda },
        'La moneda no fue encontrada o no existe',
      );

      let impuesto: Impuesto | null = null;
      if (idImpuesto !== undefined) {
        impuesto = await findEntityOrFail(
          this.impuestoRepository,
          { idImpuesto },
          'El impuesto no fue encontrado o no existe',
        );
      }

      const codigoProforma =
        await this.consecutivoService.obtenerSiguienteConsecutivo('PROFORMA');

      const nuevaProforma = this.proformaRepository.create({
        ...proformaData,
        codigoProforma,
        tramiteSeguro,
        consecutivo,
        moneda,
        impuesto,
        fecha: fecha ? new Date(fecha) : undefined,
      });

      const proformaGuardada =
        await this.proformaRepository.save(nuevaProforma);

      return await this.proformaRepository.findOne({
        where: { idProforma: proformaGuardada.idProforma },
        relations: [
          'tramiteSeguro',
          'consecutivo',
          'moneda',
          'impuesto',
          'lineas',
        ],
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
      relations: ['tramiteSeguro', 'moneda', 'impuesto', 'consecutivo'],
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
        'moneda',
        'impuesto',
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
    const proforma = await this.proformaRepository.findOne({
      where: { idProforma: id },
      relations: [
        'tramiteSeguro',
        'consecutivo',
        'moneda',
        'impuesto',
        'lineas',
        'lineas.item',
      ],
    });

    if (!proforma) {
      throw new NotFoundException(`La proforma con id ${id} no fue encontrada`);
    }

    const {
      idTramiteSeguro,
      idConsecutivo,
      idMoneda,
      idImpuesto,
      fecha,
      ...toUpdate
    } = updateProformaDto;

    if (idTramiteSeguro !== undefined) {
      proforma.tramiteSeguro = await findEntityOrFail(
        this.tramiteSeguroRepository,
        { idTramiteSeguro },
        'El trámite de seguro no fue encontrado o no existe',
      );
    }

    if (idConsecutivo !== undefined) {
      proforma.consecutivo = await findEntityOrFail(
        this.consecutivoRepository,
        { idConsecutivo },
        'El consecutivo no fue encontrado o no existe',
      );
    }

    if (idMoneda !== undefined) {
      proforma.moneda = await findEntityOrFail(
        this.monedaRepository,
        { idMoneda },
        'La moneda no fue encontrada o no existe',
      );
    }

    if (idImpuesto !== undefined) {
      proforma.impuesto = await findEntityOrFail(
        this.impuestoRepository,
        { idImpuesto },
        'El impuesto no fue encontrado o no existe',
      );
    }

    if (fecha !== undefined) {
      proforma.fecha = new Date(fecha);
    }

    Object.assign(proforma, toUpdate);

    await this.proformaRepository.save(proforma);

    return this.findOne(id);
  }

  async remove(id: number) {
    const proforma = await this.findOne(id);
    await this.proformaRepository.remove(proforma!);
  }
}
