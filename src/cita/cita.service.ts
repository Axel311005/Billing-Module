import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './entities/cita.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { MotivoCita } from 'src/motivo-cita/entities/motivo-cita.entity';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';

@Injectable()
export class CitaService {
  private readonly logger = new Logger('CitaService');

  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,
    @InjectRepository(MotivoCita)
    private readonly motivoCitaRepository: Repository<MotivoCita>,
  ) {}

  async create(createCitaDto: CreateCitaDto) {
    try {
      const {
        idCliente,
        idVehiculo,
        idMotivoCita,
        fechaInicio,
        fechaFin,
        ...citaData
      } = createCitaDto;

      const cliente = await findEntityOrFail(
        this.clienteRepository,
        { idCliente },
        'El cliente no fue encontrado o no existe',
      );

      const vehiculo = await findEntityOrFail(
        this.vehiculoRepository,
        { idVehiculo },
        'El vehículo no fue encontrado o no existe',
      );

      const motivoCita = await findEntityOrFail(
        this.motivoCitaRepository,
        { idMotivoCita },
        'El motivo de la cita no fue encontrado o no existe',
      );

      const nuevaCita = this.citaRepository.create({
        ...citaData,
        fechaInicio: new Date(fechaInicio),
        fechaFin: new Date(fechaFin),
        cliente,
        vehiculo,
        motivoCita,
      });

      const citaGuardada = await this.citaRepository.save(nuevaCita);

      return await this.citaRepository.findOne({
        where: { idCita: citaGuardada.idCita },
        relations: ['cliente', 'vehiculo', 'motivoCita'],
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
    const citas = await this.citaRepository.find({
      take: limit,
      skip: offset,
      relations: ['cliente', 'vehiculo', 'motivoCita'],
    });

    return citas;
  }

  async findOne(id: string) {
    const cita = await this.citaRepository.findOne({
      where: { idCita: id },
      relations: ['cliente', 'vehiculo', 'motivoCita'],
    });

    if (!cita) {
      throw new NotFoundException(`La cita con id ${id} no fue encontrada`);
    }

    return cita;
  }

  async update(id: string, updateCitaDto: UpdateCitaDto) {
    const { ...toUpdate } = updateCitaDto;

    const cita = await this.citaRepository.preload({
      idCita: id,
      ...toUpdate,
    });

    if (!cita) {
      throw new NotFoundException(`La cita con id ${id} no fue encontrada`);
    }

    return this.citaRepository.save(cita);
  }

  async remove(id: string) {
    const cita = await this.findOne(id);
    await this.citaRepository.remove(cita!);
  }
}
