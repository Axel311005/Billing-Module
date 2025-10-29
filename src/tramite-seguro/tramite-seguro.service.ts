import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTramiteSeguroDto } from './dto/create-tramite-seguro.dto';
import { UpdateTramiteSeguroDto } from './dto/update-tramite-seguro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TramiteSeguro } from './entities/tramite-seguro.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Aseguradora } from 'src/aseguradora/entities/aseguradora.entity';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';

@Injectable()
export class TramiteSeguroService {
  private readonly logger = new Logger('TramiteSeguroService');

  constructor(
    @InjectRepository(TramiteSeguro)
    private readonly tramiteSeguroRepository: Repository<TramiteSeguro>,
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Aseguradora)
    private readonly aseguradoraRepository: Repository<Aseguradora>,
  ) {}

  async create(createTramiteSeguroDto: CreateTramiteSeguroDto) {
    try {
      const {
        idVehiculo,
        idCliente,
        idAseguradora,
        fechaInicio,
        fechaFin,
        ...tramiteData
      } = createTramiteSeguroDto;

      const vehiculo = await findEntityOrFail(
        this.vehiculoRepository,
        { idVehiculo },
        'El vehículo no fue encontrado o no existe',
      );

      const cliente = await findEntityOrFail(
        this.clienteRepository,
        { idCliente },
        'El cliente no fue encontrado o no existe',
      );

      const aseguradora = await findEntityOrFail(
        this.aseguradoraRepository,
        { idAseguradora },
        'La aseguradora no fue encontrada o no existe',
      );

      const nuevoTramiteSeguro = this.tramiteSeguroRepository.create({
        ...tramiteData,
        fechaInicio: new Date(fechaInicio),
        fechaFin: fechaFin ? new Date(fechaFin) : undefined,
        vehiculo,
        cliente,
        aseguradora,
      });

      const tramiteGuardado =
        await this.tramiteSeguroRepository.save(nuevoTramiteSeguro);

      return await this.tramiteSeguroRepository.findOne({
        where: { idTramiteSeguro: tramiteGuardado.idTramiteSeguro },
        relations: ['vehiculo', 'cliente', 'aseguradora', 'proformas'],
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
    const tramitesSeguro = await this.tramiteSeguroRepository.find({
      take: limit,
      skip: offset,
      relations: ['vehiculo', 'cliente', 'aseguradora'],
    });

    return tramitesSeguro;
  }

  async findOne(id: number) {
    const tramiteSeguro = await this.tramiteSeguroRepository.findOne({
      where: { idTramiteSeguro: id },
      relations: ['vehiculo', 'cliente', 'aseguradora'],
    });

    if (!tramiteSeguro) {
      throw new NotFoundException(
        `El trámite de seguro con id ${id} no fue encontrado`,
      );
    }

    return tramiteSeguro;
  }

  async update(id: number, updateTramiteSeguroDto: UpdateTramiteSeguroDto) {
    const { ...toUpdate } = updateTramiteSeguroDto;

    const tramiteSeguro = await this.tramiteSeguroRepository.preload({
      idTramiteSeguro: id,
      ...toUpdate,
    });

    if (!tramiteSeguro) {
      throw new NotFoundException(
        `El trámite de seguro con id ${id} no fue encontrado`,
      );
    }

    return this.tramiteSeguroRepository.save(tramiteSeguro);
  }

  async remove(id: number) {
    const tramiteSeguro = await this.findOne(id);
    await this.tramiteSeguroRepository.remove(tramiteSeguro!);
  }
}
