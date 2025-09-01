import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUnidadMedidaDto } from './dto/create-unidad-medida.dto';
import { UpdateUnidadMedidaDto } from './dto/update-unidad-medida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnidadMedida } from './entities/unidad-medida.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class UnidadMedidaService {

  private readonly logger = new Logger('UnidadMedidaService');

  constructor(
    @InjectRepository(UnidadMedida)
    private readonly unidadMedidaRepository: Repository<UnidadMedida>
  ){}

  async create(createUnidadMedidaDto: CreateUnidadMedidaDto) {
    try {
      
      const {...unidadMedida} = createUnidadMedidaDto;

      const unidad = await this.unidadMedidaRepository.create({...unidadMedida})

      await this.unidadMedidaRepository.save(unidad);
      return {...unidad};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const unidades = await this.unidadMedidaRepository.find({
      take:limit,
      skip : offset,
    })

    return unidades;
  }

  async findOne(id: number) {
    const unidad = await this.unidadMedidaRepository.findOneBy({idUnidadMedida : id});

    if (!unidad) {
      throw new NotFoundException(`La unidad de medida con id ${id} no fue encontrada`);
    }

    return unidad;
  }

  async update(id: number, updateUnidadMedidaDto: UpdateUnidadMedidaDto) {
    const {...toUpdate} = updateUnidadMedidaDto;

    const unidad = await this.unidadMedidaRepository.preload({
      idUnidadMedida : id, 
      ...toUpdate
    })

    if (!unidad) {
      throw new NotFoundException(`La unidad de medida con id ${id} no fue encontrada`);
    }

    return this.unidadMedidaRepository.save(unidad);

  }

  async remove(id: number) {
    const unidad = await this.findOne(id);
    await this.unidadMedidaRepository.remove(unidad!);
  }
}
