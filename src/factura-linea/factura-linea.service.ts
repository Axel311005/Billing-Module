import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateFacturaLineaDto } from './dto/create-factura-linea.dto';
import { UpdateFacturaLineaDto } from './dto/update-factura-linea.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacturaLinea } from './entities/factura-linea.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Factura } from 'src/factura/entities/factura.entity';
import { Item } from 'src/item/entities/item.entity';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';

@Injectable()
export class FacturaLineaService {
  private readonly logger = new Logger('FacturaLineaService');

  constructor(
    @InjectRepository(FacturaLinea)
    private readonly facturaLineaRepository: Repository<FacturaLinea>,
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createFacturaLineaDto: CreateFacturaLineaDto) {
    try {
      let {
        facturaId,
        itemId,
        cantidad,
        precioUnitario,
        totalLinea,
        ...facturaLinea
      } = createFacturaLineaDto;

      const factura = await findEntityOrFail(
        this.facturaRepository,
        { id_factura: facturaId },
        `La factura no fue encontrada o no existe`,
      );
      const item = await findEntityOrFail(
        this.itemRepository,
        { idItem: itemId },
        `El item no fue encontrado o no existe`,
      );

      totalLinea = cantidad * precioUnitario;

      const nuevaLinea = this.facturaLineaRepository.create({
        ...facturaLinea,
        factura,
        item,
        cantidad,
        precioUnitario,
        totalLinea,
      });

      await this.facturaLineaRepository.save(nuevaLinea);

      return await this.facturaLineaRepository.findOne({
        where: { idFacturaLinea: nuevaLinea.idFacturaLinea },
        relations: ['factura', 'item'],
      });
    } catch (error) {
      console.log(error);
      this.logger.error('Error al crear la línea de factura', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const lineas = await this.facturaLineaRepository.find({
      take: limit,
      skip: offset,
      relations: ['factura', 'item'],
    });

    return lineas;
  }

  async findOne(id: number) {
    const linea = await this.facturaLineaRepository.findOne({
      where: { idFacturaLinea: id },
      relations: ['factura', 'item'],
    });

    if (!linea) {
      throw new NotFoundException(
        `La línea de factura con id ${id} no fue encontrada`,
      );
    }

    return linea;
  }

  async update(id: number, updateFacturaLineaDto: UpdateFacturaLineaDto) {
    let {
      facturaId,
      itemId,
      cantidad,
      precioUnitario,
      totalLinea,
      ...toUpdate
    } = updateFacturaLineaDto;

    totalLinea = (cantidad ?? 0) * (precioUnitario ?? 0);

    const factura = await findEntityOrFail(
      this.facturaRepository,
      { id_factura: facturaId },
      `La factura no fue encontrada o no existe`,
    );
    const item = await findEntityOrFail(
      this.itemRepository,
      { idItem: itemId },
      `El item no fue encontrado o no existe`,
    );

    const linea = await this.facturaLineaRepository.preload({
      idFacturaLinea: id,
      ...toUpdate,
      cantidad,
      precioUnitario,
      totalLinea,
      factura,
      item,
    });

    if (!linea) {
      console.log(`La línea de factura con id ${id} no fue encontrada`);
      throw new NotFoundException(`La línea de factura no fue encontrada`);
    }

    return this.facturaLineaRepository.save(linea);
  }

  async remove(id: number) {
    const linea = await this.findOne(id);
    await this.facturaLineaRepository.remove(linea!);
  }
}
