import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCotizacionDto } from './dto/create-cotizacion.dto';
import { UpdateCotizacionDto } from './dto/update-cotizacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cotizacion } from './entities/cotizacion.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Consecutivo } from 'src/consecutivo/entities/consecutivo.entity';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';
import { ConsecutivoService } from '../consecutivo/consecutivo.service';

@Injectable()
export class CotizacionService {
  private readonly logger = new Logger('CotizacionService');

  constructor(
    @InjectRepository(Cotizacion)
    private readonly cotizacionRepository: Repository<Cotizacion>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Consecutivo)
    private readonly consecutivoRepository: Repository<Consecutivo>,

    private readonly consecutivoService: ConsecutivoService,
  ) {}

  async create(createCotizacionDto: CreateCotizacionDto) {
    try {
      let { idCliente, idConsecutivo, nombreCliente, ...cotizacionData } =
        createCotizacionDto;

      const cliente = await findEntityOrFail(
        this.clienteRepository,
        { idCliente },
        'El cliente no fue encontrado o no existe',
      );

      const consecutivo = await findEntityOrFail(
        this.consecutivoRepository,
        { idConsecutivo },
        'El consecutivo no fue encontrado o no existe',
      );

      const codigoCotizacion =
        await this.consecutivoService.obtenerSiguienteConsecutivo('COTIZACION');

      nombreCliente = cliente.nombre;

      const nuevaCotizacion = this.cotizacionRepository.create({
        ...cotizacionData,
        cliente,
        consecutivo,
        codigoCotizacion,
        nombreCliente,
      });

      const cotizacionGuardada =
        await this.cotizacionRepository.save(nuevaCotizacion);

      return await this.cotizacionRepository.findOne({
        where: { idCotizacion: cotizacionGuardada.idCotizacion },
        relations: ['cliente', 'consecutivo'],
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
    const cotizaciones = await this.cotizacionRepository.find({
      take: limit,
      skip: offset,
      relations: ['cliente', 'consecutivo'],
    });

    return cotizaciones;
  }

  async findOne(id: number) {
    const cotizacion = await this.cotizacionRepository.findOne({
      where: { idCotizacion: id },
      relations: ['cliente', 'consecutivo'],
    });

    if (!cotizacion) {
      throw new NotFoundException(
        `La cotización con id ${id} no fue encontrada`,
      );
    }

    return cotizacion;
  }

  async update(id: number, updateCotizacionDto: UpdateCotizacionDto) {
    const cotizacion = await this.cotizacionRepository.findOne({
      where: { idCotizacion: id },
      relations: ['cliente', 'consecutivo'],
    });

    if (!cotizacion) {
      throw new NotFoundException(
        `La cotización con id ${id} no fue encontrada`,
      );
    }

    const { idCliente, idConsecutivo, fecha, ...toUpdate } =
      updateCotizacionDto;

    if (idCliente !== undefined) {
      cotizacion.cliente = await findEntityOrFail(
        this.clienteRepository,
        { idCliente },
        'El cliente no fue encontrado o no existe',
      );
    }

    if (idConsecutivo !== undefined) {
      cotizacion.consecutivo = await findEntityOrFail(
        this.consecutivoRepository,
        { idConsecutivo },
        'El consecutivo no fue encontrado o no existe',
      );
    }

    if (fecha !== undefined) {
      cotizacion.fecha = new Date(fecha);
    }

    Object.assign(cotizacion, toUpdate);

    await this.cotizacionRepository.save(cotizacion);

    return this.findOne(id);
  }

  async remove(id: number) {
    const cotizacion = await this.findOne(id);
    await this.cotizacionRepository.remove(cotizacion!);
  }
}
