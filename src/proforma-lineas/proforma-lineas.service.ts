import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProformaLineasDto } from './dto/create-proforma-lineas.dto';
import { UpdateProformaLineasDto } from './dto/update-proforma-lineas.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProformaLineas } from './entities/proforma-lineas.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Proforma } from 'src/proforma/entities/proforma.entity';
import { Item } from 'src/item/entities/item.entity';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';

@Injectable()
export class ProformaLineasService {
  private readonly logger = new Logger('ProformaLineasService');

  constructor(
    @InjectRepository(ProformaLineas)
    private readonly proformaLineasRepository: Repository<ProformaLineas>,
    @InjectRepository(Proforma)
    private readonly proformaRepository: Repository<Proforma>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createProformaLineasDto: CreateProformaLineasDto) {
    try {
      const { idProforma, idItem, cantidad, precioUnitario, ...proformaLinea } =
        createProformaLineasDto;

      const proforma = await findEntityOrFail(
        this.proformaRepository,
        { idProforma },
        'La proforma no fue encontrada o no existe',
      );

      const item = await findEntityOrFail(
        this.itemRepository,
        { idItem },
        'El item no fue encontrado o no existe',
      );

      const cantidadValue = Number(cantidad);
      const precioUnitarioValue = Number(precioUnitario);
      const totalLinea = cantidadValue * precioUnitarioValue;

      const nuevaProformaLineas = this.proformaLineasRepository.create({
        ...proformaLinea,
        cantidad: cantidadValue,
        precioUnitario: precioUnitarioValue,
        totalLinea,
        proforma,
        item,
      });

      await this.proformaLineasRepository.save(nuevaProformaLineas);
      return await this.proformaLineasRepository.findOne({
        where: { idProformaLineas: nuevaProformaLineas.idProformaLineas },
        relations: ['proforma', 'item'],
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
    const proformaLineas = await this.proformaLineasRepository.find({
      take: limit,
      skip: offset,
      relations: ['proforma', 'item'],
    });

    return proformaLineas;
  }

  async findOne(id: number) {
    const proformaLineas = await this.proformaLineasRepository.findOne({
      where: { idProformaLineas: id },
      relations: ['proforma', 'item'],
    });

    if (!proformaLineas) {
      throw new NotFoundException(
        `La línea de proforma con id ${id} no fue encontrada`,
      );
    }

    return proformaLineas;
  }

  async update(id: number, updateProformaLineasDto: UpdateProformaLineasDto) {
    let {
      cantidad,
      precioUnitario,
      totalLinea,
      idProforma,
      idItem,
      ...toUpdate
    } = updateProformaLineasDto;

    totalLinea = (cantidad ?? 0) * (precioUnitario ?? 0);

    const proforma = await findEntityOrFail(
      this.proformaRepository,
      { idProforma },
      'La proforma no fue encontrada o no existe',
    );

    const item = await findEntityOrFail(
      this.itemRepository,
      { idItem },
      'El item no fue encontrado o no existe',
    );

    const proformaLineas = await this.proformaLineasRepository.preload({
      idProformaLineas: id,
      proforma,
      item,
      cantidad,
      precioUnitario,
      totalLinea,
      ...toUpdate,
    });

    if (!proformaLineas) {
      throw new NotFoundException(
        `La línea de proforma con id ${id} no fue encontrada`,
      );
    }

    return this.proformaLineasRepository.save(proformaLineas);
  }

  async remove(id: number) {
    const proformaLineas = await this.findOne(id);
    await this.proformaLineasRepository.remove(proformaLineas!);
  }
}
