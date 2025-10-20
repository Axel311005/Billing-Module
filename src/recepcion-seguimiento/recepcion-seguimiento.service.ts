import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRecepcionSeguimientoDto } from './dto/create-recepcion-seguimiento.dto';
import { UpdateRecepcionSeguimientoDto } from './dto/update-recepcion-seguimiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecepcionSeguimiento } from './entities/recepcion-seguimiento.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class RecepcionSeguimientoService {

  private readonly logger = new Logger('RecepcionSeguimientoService');

  constructor(
    @InjectRepository(RecepcionSeguimiento)
    private readonly recepcionSeguimientoRepository: Repository<RecepcionSeguimiento>
  ){}

  async create(createRecepcionSeguimientoDto: CreateRecepcionSeguimientoDto) {
    try {
      
      const {...recepcionSeguimiento} = createRecepcionSeguimientoDto;

      const nuevoRecepcionSeguimiento = await this.recepcionSeguimientoRepository.create({...recepcionSeguimiento})

      await this.recepcionSeguimientoRepository.save(nuevoRecepcionSeguimiento);
      return {...nuevoRecepcionSeguimiento};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const recepcionSeguimientos = await this.recepcionSeguimientoRepository.find({
      take:limit,
      skip : offset,
      relations: ['recepcion']
    })

    return recepcionSeguimientos;
  }

  async findOne(id: number) {
    const recepcionSeguimiento = await this.recepcionSeguimientoRepository.findOne({
      where: {idRecepcionSeguimiento : id},
      relations: ['recepcion']
    });

    if (!recepcionSeguimiento) {
      throw new NotFoundException(`El seguimiento de recepción con id ${id} no fue encontrado`);
    }

    return recepcionSeguimiento;
  }

  async update(id: number, updateRecepcionSeguimientoDto: UpdateRecepcionSeguimientoDto) {
    const {...toUpdate} = updateRecepcionSeguimientoDto;

    const recepcionSeguimiento = await this.recepcionSeguimientoRepository.preload({
      idRecepcionSeguimiento : id, 
      ...toUpdate
    })

    if (!recepcionSeguimiento) {
      throw new NotFoundException(`El seguimiento de recepción con id ${id} no fue encontrado`);
    }

    return this.recepcionSeguimientoRepository.save(recepcionSeguimiento);

  }

  async remove(id: number) {
    const recepcionSeguimiento = await this.findOne(id);
    await this.recepcionSeguimientoRepository.remove(recepcionSeguimiento!);
  }
}
