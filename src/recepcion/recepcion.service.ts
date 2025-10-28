import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRecepcionDto } from './dto/create-recepcion.dto';
import { UpdateRecepcionDto } from './dto/update-recepcion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recepcion } from './entities/recepcion.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class RecepcionService {

  private readonly logger = new Logger('RecepcionService');

  constructor(
    @InjectRepository(Recepcion)
    private readonly recepcionRepository: Repository<Recepcion>
  ){}

  async create(createRecepcionDto: CreateRecepcionDto) {
    try {
      
      const {...recepcion} = createRecepcionDto;

      const nuevaRecepcion = await this.recepcionRepository.create({...recepcion})

      await this.recepcionRepository.save(nuevaRecepcion);
      return {...nuevaRecepcion};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const recepciones = await this.recepcionRepository.find({
      take:limit,
      skip : offset,
      relations: ['vehiculo', 'empleado']
    })

    return recepciones;
  }

  async findOne(id: number) {
    const recepcion = await this.recepcionRepository.findOne({
      where: {idRecepcion : id},
      relations: ['vehiculo', 'empleado']
    });

    if (!recepcion) {
      throw new NotFoundException(`La recepción con id ${id} no fue encontrada`);
    }

    return recepcion;
  }

  async update(id: number, updateRecepcionDto: UpdateRecepcionDto) {
    const {...toUpdate} = updateRecepcionDto;

    const recepcion = await this.recepcionRepository.preload({
      idRecepcion : id, 
      ...toUpdate
    })

    if (!recepcion) {
      throw new NotFoundException(`La recepción con id ${id} no fue encontrada`);
    }

    return this.recepcionRepository.save(recepcion);

  }

  async remove(id: number) {
    const recepcion = await this.findOne(id);
    await this.recepcionRepository.remove(recepcion!);
  }
}




