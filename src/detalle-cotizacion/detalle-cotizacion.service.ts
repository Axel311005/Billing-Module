import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateDetalleCotizacionDto } from './dto/create-detalle-cotizacion.dto';
import { UpdateDetalleCotizacionDto } from './dto/update-detalle-cotizacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleCotizacion } from './entities/detalle-cotizacion.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Item } from 'src/item/entities/item.entity';
import { Cotizacion } from 'src/cotizacion/entities/cotizacion.entity';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';

@Injectable()
export class DetalleCotizacionService {
  private readonly logger = new Logger('DetalleCotizacionService');

  constructor(
    @InjectRepository(DetalleCotizacion)
    private readonly detalleCotizacionRepository: Repository<DetalleCotizacion>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Cotizacion)
    private readonly cotizacionRepository: Repository<Cotizacion>,
  ) {}

  async create(createDetalleCotizacionDto: CreateDetalleCotizacionDto) {
    try {
      const {
        idItem,
        idCotizacion,
        cantidad,
        precioUnitario,
        totalLineas,
        ...detalleData
      } = createDetalleCotizacionDto;

      const item = await findEntityOrFail(
        this.itemRepository,
        { idItem },
        'El item no fue encontrado o no existe',
      );

      const cotizacion = await findEntityOrFail(
        this.cotizacionRepository,
        { idCotizacion },
        'La cotización no fue encontrada o no existe',
      );

      const cantidadValue = Number(cantidad);
      const precioUnitarioValue = Number(precioUnitario);
      const totalLinea = cantidadValue * precioUnitarioValue;

      const nuevoDetalleCotizacion = this.detalleCotizacionRepository.create({
        ...detalleData,
        item,
        cotizacion,
        cantidad: cantidadValue,
        precioUnitario: precioUnitarioValue,
        totalLineas: totalLinea,
      });

      const detalleGuardado = await this.detalleCotizacionRepository.save(
        nuevoDetalleCotizacion,
      );

      return await this.detalleCotizacionRepository.findOne({
        where: { idDetalleCotizacion: detalleGuardado.idDetalleCotizacion },
        relations: ['item', 'cotizacion'],
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
    const detalleCotizaciones = await this.detalleCotizacionRepository.find({
      take: limit,
      skip: offset,
      relations: ['item', 'cotizacion'],
    });

    return detalleCotizaciones;
  }

  async findOne(id: number) {
    const detalleCotizacion = await this.detalleCotizacionRepository.findOne({
      where: { idDetalleCotizacion: id },
      relations: ['item', 'cotizacion'],
    });

    if (!detalleCotizacion) {
      throw new NotFoundException(
        `El detalle de cotización con id ${id} no fue encontrado`,
      );
    }

    return detalleCotizacion;
  }

  async update(
    id: number,
    updateDetalleCotizacionDto: UpdateDetalleCotizacionDto,
  ) {
    const {
      cantidad,
      precioUnitario,
      totalLineas,
      idCotizacion,
      idItem,
      ...toUpdate
    } = updateDetalleCotizacionDto;

    const item = await findEntityOrFail(
      this.itemRepository,
      { idItem },
      'El item no fue encontrado o no existe',
    );

    const cotizacion = await findEntityOrFail(
      this.cotizacionRepository,
      { idCotizacion },
      'La cotización no fue encontrada o no existe',
    );

    const detalleCotizacion = await this.detalleCotizacionRepository.preload({
      idDetalleCotizacion: id,
      item,
      cotizacion,
      cantidad,
      precioUnitario,
      totalLineas,
      ...toUpdate,
    });

    if (!detalleCotizacion) {
      throw new NotFoundException(
        `El detalle de cotización con id ${id} no fue encontrado`,
      );
    }

    return this.detalleCotizacionRepository.save(detalleCotizacion);
  }

  async remove(id: number) {
    const detalleCotizacion = await this.findOne(id);
    await this.detalleCotizacionRepository.remove(detalleCotizacion!);
  }
}
