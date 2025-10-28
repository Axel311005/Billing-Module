import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './entities/cita.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class CitaService {

  private readonly logger = new Logger('CitaService');

  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>
  ){}

  async create(createCitaDto: CreateCitaDto) {
    try {
      
      const {...cita} = createCitaDto;

      const nuevaCita = await this.citaRepository.create({...cita})

      await this.citaRepository.save(nuevaCita);
      return {...nuevaCita};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const citas = await this.citaRepository.find({
      take:limit,
      skip : offset,
      relations: ['cliente', 'vehiculo', 'motivoCita']
    })

    return citas;
  }

  async findOne(id: string) {
    const cita = await this.citaRepository.findOne({
      where: {uniqueId : id},
      relations: ['cliente', 'vehiculo', 'motivoCita']
    });

    if (!cita) {
      throw new NotFoundException(`La cita con id ${id} no fue encontrada`);
    }

    return cita;
  }

  async update(id: string, updateCitaDto: UpdateCitaDto) {
    const {...toUpdate} = updateCitaDto;

    const cita = await this.citaRepository.preload({
      uniqueId : id, 
      ...toUpdate
    })

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




