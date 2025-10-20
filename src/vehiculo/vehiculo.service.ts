import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class VehiculoService {

  private readonly logger = new Logger('VehiculoService');

  constructor(
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>
  ){}

  async create(createVehiculoDto: CreateVehiculoDto) {
    try {
      
      const {...vehiculo} = createVehiculoDto;

      const nuevoVehiculo = await this.vehiculoRepository.create({...vehiculo})

      await this.vehiculoRepository.save(nuevoVehiculo);
      return {...nuevoVehiculo};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const vehiculos = await this.vehiculoRepository.find({
      take:limit,
      skip : offset,
      relations: ['cliente']
    })

    return vehiculos;
  }

  async findOne(id: number) {
    const vehiculo = await this.vehiculoRepository.findOne({
      where: {idVehiculo : id},
      relations: ['cliente']
    });

    if (!vehiculo) {
      throw new NotFoundException(`El vehículo con id ${id} no fue encontrado`);
    }

    return vehiculo;
  }

  async update(id: number, updateVehiculoDto: UpdateVehiculoDto) {
    const {...toUpdate} = updateVehiculoDto;

    const vehiculo = await this.vehiculoRepository.preload({
      idVehiculo : id, 
      ...toUpdate
    })

    if (!vehiculo) {
      throw new NotFoundException(`El vehículo con id ${id} no fue encontrado`);
    }

    return this.vehiculoRepository.save(vehiculo);

  }

  async remove(id: number) {
    const vehiculo = await this.findOne(id);
    await this.vehiculoRepository.remove(vehiculo!);
  }
}
