import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCajaDto } from './dto/create-caja.dto';
import { UpdateCajaDto } from './dto/update-caja.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Caja } from './entities/caja.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class CajaService {

  private readonly logger = new Logger('CajaService');

  constructor(
    @InjectRepository(Caja)
    private readonly cajaRepository: Repository<Caja>
  ){}

  async create(createCajaDto: CreateCajaDto) {
    try {
      
      const {...caja} = createCajaDto;

      const nuevaCaja = await this.cajaRepository.create({...caja})

      await this.cajaRepository.save(nuevaCaja);
      return {...nuevaCaja};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const cajas = await this.cajaRepository.find({
      take:limit,
      skip : offset,
    })

    return cajas;
  }

  async findOne(id: number) {
    const caja = await this.cajaRepository.findOneBy({idCaja : id});

    if (!caja) {
      throw new NotFoundException(`La caja con id ${id} no fue encontrada`);
    }

    return caja;
  }

  async update(id: number, updateCajaDto: UpdateCajaDto) {
    const {...toUpdate} = updateCajaDto;

    const caja = await this.cajaRepository.preload({
      idCaja : id, 
      ...toUpdate
    })

    if (!caja) {
      throw new NotFoundException(`La caja con id ${id} no fue encontrada`);
    }

    return this.cajaRepository.save(caja);

  }

  async remove(id: number) {
    const caja = await this.findOne(id);
    await this.cajaRepository.remove(caja!);
  }
}

