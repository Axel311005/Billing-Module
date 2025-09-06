import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ClasificacionItem } from 'src/clasificacion-item/entities/clasificacion-item.entity';
import { UnidadMedida } from 'src/unidad-medida/entities/unidad-medida.entity';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';

@Injectable()
export class ItemService {

  private readonly logger = new Logger('ItemService');

  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(ClasificacionItem)
    private readonly clasificacionItemRepository: Repository<ClasificacionItem>,
    @InjectRepository(UnidadMedida)
    private readonly unidadMedidaRepository: Repository<UnidadMedida>,
  ){}

  async create(createItemDto: CreateItemDto) {
    try {
      
      const {clasificacionId, unidadMedidaId, ...item} = createItemDto;

      const clasificacion = await findEntityOrFail(
        this.clasificacionItemRepository, {idClasificacion: clasificacionId}, 
        `La clasificación no fue encontrada o no existe`
      );
      const unidadMedida = await findEntityOrFail(
        this.unidadMedidaRepository, {idUnidadMedida: unidadMedidaId}, 
        `La unidad de medida no fue encontrada o no existe`
      );

      const nuevoItem = this.itemRepository.create({
        ...item,
        clasificacion,
        unidadMedida,
      })

      await this.itemRepository.save(nuevoItem);

      return await this.itemRepository.findOne({
        where : {idItem : nuevoItem.idItem},
        relations: ['clasificacion', 'unidadMedida', 'facturaLineas', 'compraLineas', 'existencias']
      })

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const items = await this.itemRepository.find({
      take:limit,
      skip : offset,
      relations: ['clasificacion', 'unidadMedida', 'facturaLineas', 'compraLineas', 'existencias']
    })

    return items;
  }

  async findOne(id: number) {
    const item = await this.itemRepository.findOne({
      where: {idItem : id},
      relations: ['clasificacion', 'unidadMedida', 'facturaLineas', 'compraLineas', 'existencias']
    });

    if (!item) {
      throw new NotFoundException(`El item con id ${id} no fue encontrado`);
    }

    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const {clasificacionId, unidadMedidaId, ...toUpdate} = updateItemDto;

    const clasificacion = await findEntityOrFail(
      this.clasificacionItemRepository, {idClasificacion: clasificacionId}, 
      `La clasificación no fue encontrada o no existe`
    );
    const unidadMedida = await findEntityOrFail(
      this.unidadMedidaRepository, {idUnidadMedida: unidadMedidaId}, 
      `La unidad de medida no fue encontrada o no existe`
    );

    const item = await this.itemRepository.preload({
      idItem : id, 
      ...toUpdate,
      clasificacion,
      unidadMedida,
    })

    if (!item) {
      console.log(`El item con id ${id} no fue encontrado`);
      throw new NotFoundException(`El item no fue encontrado`);
    }

    return this.itemRepository.save(item);

  }

  async remove(id: number) {
    const item = await this.findOne(id);
    await this.itemRepository.remove(item!);
  }
}
