import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateExistenciaBodegaDto } from './dto/create-existencia-bodega.dto';
import { UpdateExistenciaBodegaDto } from './dto/update-existencia-bodega.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExistenciaBodega } from './entities/existencia-bodega.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Item } from 'src/item/entities/item.entity';
import { Bodega } from 'src/bodega/entities/bodega.entity';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';

@Injectable()
export class ExistenciaBodegaService {

  private readonly logger = new Logger('ExistenciaBodegaService');

  constructor(
    @InjectRepository(ExistenciaBodega)
    private readonly existenciaBodegaRepository: Repository<ExistenciaBodega>,
    @InjectRepository(Item)
    private readonly itemRepository : Repository<Item>,
    @InjectRepository(Bodega)
    private readonly bodegaRepository : Repository<Bodega>,
  ){}

  async create(createExistenciaBodegaDto: CreateExistenciaBodegaDto) {
    try {
      
      const {itemId, bodegaId, ...existenciaBodega} = createExistenciaBodegaDto;

      const item = await findEntityOrFail(
        this.itemRepository, {idItem: itemId}, 
        `El item no fue encontrado o no existe`
      );
      const bodega = await findEntityOrFail(this.bodegaRepository, {idBodega: bodegaId}, 
        `La bodega no fue encontrada o no existe`
      );

      const nuevaExistencia =  this.existenciaBodegaRepository.create({
        ...existenciaBodega,
        item,
        bodega,
      })

      await this.existenciaBodegaRepository.save(nuevaExistencia);

      return await this.existenciaBodegaRepository.findOne({
        where : {idExistenciaBodega : nuevaExistencia.idExistenciaBodega},
        relations: ['item', 'bodega']
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
    const existencias = await this.existenciaBodegaRepository.find({
      take:limit,
      skip : offset,
      relations: ['item', 'bodega']
    })

    return existencias;
  }

  async findOne(id: number) {
    const existencia = await this.existenciaBodegaRepository.findOne({
      where: {idExistenciaBodega : id},
      relations: ['item', 'bodega']
    });

    if (!existencia) {
      throw new NotFoundException(`La existencia de bodega con id ${id} no fue encontrada`);
    }

    return existencia;
  }

  async update(id: number, updateExistenciaBodegaDto: UpdateExistenciaBodegaDto) {
    const {itemId, bodegaId, ...toUpdate} = updateExistenciaBodegaDto;

    const item = await findEntityOrFail(
      this.itemRepository, {idItem: itemId}, 
      `El item no fue encontrado o no existe`
    );
    const bodega = await findEntityOrFail(this.bodegaRepository, {idBodega: bodegaId}, 
      `La bodega no fue encontrada o no existe`
    );

    const existencia = await this.existenciaBodegaRepository.preload({
      idExistenciaBodega : id, 
      ...toUpdate,
      item,
      bodega,
    })

    if (!existencia) {
      console.log(`La existencia de bodega con id ${id} no fue encontrada`);
      throw new NotFoundException(`La existencia de bodega no fue encontrada`);
    }

    return this.existenciaBodegaRepository.save(existencia);

  }

  async remove(id: number) {
    const existencia = await this.findOne(id);
    await this.existenciaBodegaRepository.remove(existencia!);
  }
}
