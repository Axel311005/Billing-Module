import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMotivoCitaDto } from './dto/create-motivo-cita.dto';
import { UpdateMotivoCitaDto } from './dto/update-motivo-cita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MotivoCita } from './entities/motivo-cita.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class MotivoCitaService {

  private readonly logger = new Logger('MotivoCitaService');

  constructor(
    @InjectRepository(MotivoCita)
    private readonly motivoCitaRepository: Repository<MotivoCita>
  ){}

  async create(createMotivoCitaDto: CreateMotivoCitaDto) {
    try {
      
      const {...motivoCita} = createMotivoCitaDto;

      const nuevoMotivoCita = await this.motivoCitaRepository.create({...motivoCita})

      await this.motivoCitaRepository.save(nuevoMotivoCita);
      return {...nuevoMotivoCita};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const motivosCita = await this.motivoCitaRepository.find({
      take:limit,
      skip : offset,
    })

    return motivosCita;
  }

  async findOne(id: number) {
    const motivoCita = await this.motivoCitaRepository.findOneBy({idMotivoCita : id});

    if (!motivoCita) {
      throw new NotFoundException(`El motivo de cita con id ${id} no fue encontrado`);
    }

    return motivoCita;
  }

  async update(id: number, updateMotivoCitaDto: UpdateMotivoCitaDto) {
    const {...toUpdate} = updateMotivoCitaDto;

    const motivoCita = await this.motivoCitaRepository.preload({
      idMotivoCita : id, 
      ...toUpdate
    })

    if (!motivoCita) {
      throw new NotFoundException(`El motivo de cita con id ${id} no fue encontrado`);
    }

    return this.motivoCitaRepository.save(motivoCita);

  }

  async remove(id: number) {
    const motivoCita = await this.findOne(id);
    await this.motivoCitaRepository.remove(motivoCita!);
  }
}
