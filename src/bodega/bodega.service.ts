import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateBodegaDto } from './dto/create-bodega.dto';
import { UpdateBodegaDto } from './dto/update-bodega.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bodega } from './entities/bodega.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class BodegaService {

  private readonly logger = new Logger('BodegaService');

  constructor(
    @InjectRepository(Bodega)
    private readonly bodegaRepository: Repository<Bodega>
  ){}

  async create(createBodegaDto: CreateBodegaDto) {
    try {
      
      const {...bodega} = createBodegaDto;

      const nuevaBodega = await this.bodegaRepository.create({...bodega})

      await this.bodegaRepository.save(nuevaBodega);
      return {...nuevaBodega};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const bodegas = await this.bodegaRepository.find({
      take:limit,
      skip : offset,
    })

    return bodegas;
  }

  async findOne(id: number) {
    const bodega = await this.bodegaRepository.findOneBy({idBodega : id});

    if (!bodega) {
      throw new NotFoundException(`La bodega con id ${id} no fue encontrada`);
    }

    return bodega;
  }

  async update(id: number, updateBodegaDto: UpdateBodegaDto) {
    const {...toUpdate} = updateBodegaDto;

    const bodega = await this.bodegaRepository.preload({
      idBodega : id, 
      ...toUpdate
    })

    if (!bodega) {
      throw new NotFoundException(`La bodega con id ${id} no fue encontrada`);
    }

    return this.bodegaRepository.save(bodega);

  }

  async remove(id: number) {
    const bodega = await this.findOne(id);
    await this.bodegaRepository.remove(bodega!);
  }
}
