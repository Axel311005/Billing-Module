import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRecepcionDto } from './dto/create-recepcion.dto';
import { UpdateRecepcionDto } from './dto/update-recepcion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recepcion } from './entities/recepcion.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';

@Injectable()
export class RecepcionService {
  private readonly logger = new Logger('RecepcionService');

  constructor(
    @InjectRepository(Recepcion)
    private readonly recepcionRepository: Repository<Recepcion>,
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
  ) {}

  async create(createRecepcionDto: CreateRecepcionDto) {
    try {
      const {
        idVehiculo,
        idEmpleado,
        fechaRecepcion,
        fechaEntregaEstimada,
        fechaEntregaReal,
        ...recepcionData
      } = createRecepcionDto;

      const vehiculo = await findEntityOrFail(
        this.vehiculoRepository,
        { idVehiculo },
        'El vehículo no fue encontrado o no existe',
      );

      const empleado = await findEntityOrFail(
        this.empleadoRepository,
        { idEmpleado },
        'El empleado no fue encontrado o no existe',
      );

      const nuevaRecepcion = this.recepcionRepository.create({
        ...recepcionData,
        fechaRecepcion: new Date(fechaRecepcion),
        fechaEntregaEstimada: fechaEntregaEstimada
          ? new Date(fechaEntregaEstimada)
          : undefined,
        fechaEntregaReal: fechaEntregaReal
          ? new Date(fechaEntregaReal)
          : undefined,
        vehiculo,
        empleado,
      });

      const recepcionGuardada =
        await this.recepcionRepository.save(nuevaRecepcion);
      return await this.recepcionRepository.findOne({
        where: { idRecepcion: recepcionGuardada.idRecepcion },
        relations: ['vehiculo', 'empleado', 'seguimientos'],
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
    const recepciones = await this.recepcionRepository.find({
      take: limit,
      skip: offset,
      relations: ['vehiculo', 'empleado'],
    });

    return recepciones;
  }

  async findOne(id: number) {
    const recepcion = await this.recepcionRepository.findOne({
      where: { idRecepcion: id },
      relations: ['vehiculo', 'empleado'],
    });

    if (!recepcion) {
      throw new NotFoundException(
        `La recepción con id ${id} no fue encontrada`,
      );
    }

    return recepcion;
  }

  async update(id: number, updateRecepcionDto: UpdateRecepcionDto) {
    const { ...toUpdate } = updateRecepcionDto;

    const recepcion = await this.recepcionRepository.preload({
      idRecepcion: id,
      ...toUpdate,
    });

    if (!recepcion) {
      throw new NotFoundException(
        `La recepción con id ${id} no fue encontrada`,
      );
    }

    return this.recepcionRepository.save(recepcion);
  }

  async remove(id: number) {
    const recepcion = await this.findOne(id);
    await this.recepcionRepository.remove(recepcion!);
  }
}
