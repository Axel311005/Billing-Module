import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateClasificacionItemDto } from './dto/create-clasificacion-item.dto';
import { UpdateClasificacionItemDto } from './dto/update-clasificacion-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClasificacionItem } from './entities/clasificacion-item.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class ClasificacionItemService {

  private readonly logger = new Logger('ClasificacionItemService');

  constructor(
    @InjectRepository(ClasificacionItem)
    private readonly clasificacionItemRepository: Repository<ClasificacionItem>
  ){}

  async create(createClasificacionItemDto: CreateClasificacionItemDto) {
    try {
      
      const {...clasificacionItem} = createClasificacionItemDto;

      const clasificacion = await this.clasificacionItemRepository.create({...clasificacionItem})

      await this.clasificacionItemRepository.save(clasificacion);
      return {...clasificacion};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const clasificaciones = await this.clasificacionItemRepository.find({
      take:limit,
      skip : offset,
    })

    return clasificaciones;
  }

  findOne(id: number) {
    const clasificacion = this.clasificacionItemRepository.findOneBy({idClasificacion : id});

    if (!clasificacion) {
      throw new NotFoundException(`El producto con id ${id} no fue encontrado`);
    }

    return clasificacion;
  }

  async update(id: number, updateClasificacionItemDto: UpdateClasificacionItemDto) {
    const {...toUpdate} = updateClasificacionItemDto;

    const clasificacion = await this.clasificacionItemRepository.preload({
      idClasificacion : id, 
      ...toUpdate
    })

    if (!clasificacion) {
      throw new NotFoundException(`La clasificacion con id ${id} no fue encontrada`);
    }

    return this.clasificacionItemRepository.save(clasificacion);

  }

  async remove(id: number) {
    const clasificacion = await this.findOne(id);
    await this.clasificacionItemRepository.remove(clasificacion!);
  }
}
