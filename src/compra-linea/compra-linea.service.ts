import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCompraLineaDto } from './dto/create-compra-linea.dto';
import { UpdateCompraLineaDto } from './dto/update-compra-linea.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompraLinea } from './entities/compra-linea.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Compra } from 'src/compra/entities/compra.entity';
import { Item } from 'src/item/entities/item.entity';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';

@Injectable()
export class CompraLineaService {

  private readonly logger = new Logger('CompraLineaService');

  constructor(
    @InjectRepository(CompraLinea)
    private readonly compraLineaRepository: Repository<CompraLinea>,
    @InjectRepository(Compra)
    private readonly compraRepository: Repository<Compra>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ){}

  async create(createCompraLineaDto: CreateCompraLineaDto) {
    try {
      
      let {compraId, itemId,precioUnitario,cantidad, totalLinea, ...compraLinea} = createCompraLineaDto;

      const compra = await findEntityOrFail(
        this.compraRepository, {idCompra: compraId}, 
        `La compra no fue encontrada o no existe`
      );
      const item = await findEntityOrFail(
        this.itemRepository, {idItem: itemId}, 
        `El item no fue encontrado o no existe`
      );

      totalLinea = precioUnitario * cantidad;


      const nuevaLinea = this.compraLineaRepository.create({
        ...compraLinea,
        compra,
        item,
        precioUnitario, 
        cantidad,
        totalLinea
      })

      await this.compraLineaRepository.save(nuevaLinea);

      return await this.compraLineaRepository.findOne({
        where : {idCompraLinea : nuevaLinea.idCompraLinea},
        relations: ['compra', 'item']
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
    const lineas = await this.compraLineaRepository.find({
      take:limit,
      skip : offset,
      relations: ['compra', 'item']
    })

    return lineas;
  }

  async findOne(id: number) {
    const linea = await this.compraLineaRepository.findOne({
      where: {idCompraLinea : id},
      relations: ['compra', 'item']
    });

    if (!linea) {
      throw new NotFoundException(`La línea de compra con id ${id} no fue encontrada`);
    }

    return linea;
  }

  async update(id: number, updateCompraLineaDto: UpdateCompraLineaDto) {
    let {compraId, itemId, cantidad, precioUnitario, totalLinea, ...toUpdate} = updateCompraLineaDto;

    const compra = await findEntityOrFail(
      this.compraRepository, {idCompra: compraId}, 
      `La compra no fue encontrada o no existe`
    );
    const item = await findEntityOrFail(
      this.itemRepository, {idItem: itemId}, 
      `El item no fue encontrado o no existe`
    );

    if(!cantidad && !precioUnitario){
      throw new BadRequestException('')
    }

    totalLinea = (cantidad ?? 0) * (precioUnitario ?? 0);

    const linea = await this.compraLineaRepository.preload({
      idCompraLinea : id, 
      ...toUpdate,
      compra,
      item,
      cantidad,
      precioUnitario,
      totalLinea
    })

    if (!linea) {
      console.log(`La línea de compra con id ${id} no fue encontrada`);
      throw new NotFoundException(`La línea de compra no fue encontrada`);
    }

    return this.compraLineaRepository.save(linea);

  }

  async remove(id: number) {
    const linea = await this.findOne(id);
    await this.compraLineaRepository.remove(linea!);
  }
}
