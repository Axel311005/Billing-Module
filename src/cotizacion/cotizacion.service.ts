import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCotizacionDto } from './dto/create-cotizacion.dto';
import { UpdateCotizacionDto } from './dto/update-cotizacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cotizacion } from './entities/cotizacion.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class CotizacionService {

  private readonly logger = new Logger('CotizacionService');

  constructor(
    @InjectRepository(Cotizacion)
    private readonly cotizacionRepository: Repository<Cotizacion>
  ){}

  async create(createCotizacionDto: CreateCotizacionDto) {
    try {
      
      const {...cotizacion} = createCotizacionDto;

      const nuevaCotizacion = await this.cotizacionRepository.create({...cotizacion})

      await this.cotizacionRepository.save(nuevaCotizacion);
      return {...nuevaCotizacion};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const cotizaciones = await this.cotizacionRepository.find({
      take:limit,
      skip : offset,
      relations: ['cliente']
    })

    return cotizaciones;
  }

  async findOne(id: number) {
    const cotizacion = await this.cotizacionRepository.findOne({
      where: {idCotizacion : id},
      relations: ['cliente']
    });

    if (!cotizacion) {
      throw new NotFoundException(`La cotización con id ${id} no fue encontrada`);
    }

    return cotizacion;
  }

  async update(id: number, updateCotizacionDto: UpdateCotizacionDto) {
    const {...toUpdate} = updateCotizacionDto;

    const cotizacion = await this.cotizacionRepository.preload({
      idCotizacion : id, 
      ...toUpdate
    })

    if (!cotizacion) {
      throw new NotFoundException(`La cotización con id ${id} no fue encontrada`);
    }

    return this.cotizacionRepository.save(cotizacion);

  }

  async remove(id: number) {
    const cotizacion = await this.findOne(id);
    await this.cotizacionRepository.remove(cotizacion!);
  }
}




