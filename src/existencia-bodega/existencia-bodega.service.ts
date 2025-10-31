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
import { InventoryStockReportData } from 'src/reports';
import { InventoryStockReportFilterDto } from './dto/inventory-report.dto';

@Injectable()
export class ExistenciaBodegaService {
  private readonly logger = new Logger('ExistenciaBodegaService');

  constructor(
    @InjectRepository(ExistenciaBodega)
    private readonly existenciaBodegaRepository: Repository<ExistenciaBodega>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Bodega)
    private readonly bodegaRepository: Repository<Bodega>,
  ) {}

  async create(createExistenciaBodegaDto: CreateExistenciaBodegaDto) {
    try {
      const { itemId, bodegaId, ...existenciaBodega } =
        createExistenciaBodegaDto;

      const item = await findEntityOrFail(
        this.itemRepository,
        { idItem: itemId },
        `El item no fue encontrado o no existe`,
      );
      const bodega = await findEntityOrFail(
        this.bodegaRepository,
        { idBodega: bodegaId },
        `La bodega no fue encontrada o no existe`,
      );

      const nuevaExistencia = this.existenciaBodegaRepository.create({
        ...existenciaBodega,
        item,
        bodega,
      });

      await this.existenciaBodegaRepository.save(nuevaExistencia);

      return await this.existenciaBodegaRepository.findOne({
        where: { idExistenciaBodega: nuevaExistencia.idExistenciaBodega },
        relations: ['item', 'bodega'],
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const existencias = await this.existenciaBodegaRepository.find({
      take: limit,
      skip: offset,
      relations: ['item', 'bodega'],
    });

    return existencias;
  }

  async findOne(id: number) {
    const existencia = await this.existenciaBodegaRepository.findOne({
      where: { idExistenciaBodega: id },
      relations: ['item', 'bodega'],
    });

    if (!existencia) {
      throw new NotFoundException(
        `La existencia de bodega con id ${id} no fue encontrada`,
      );
    }

    return existencia;
  }

  async update(
    id: number,
    updateExistenciaBodegaDto: UpdateExistenciaBodegaDto,
  ) {
    const { itemId, bodegaId, ...toUpdate } = updateExistenciaBodegaDto;

    const item = await findEntityOrFail(
      this.itemRepository,
      { idItem: itemId },
      `El item no fue encontrado o no existe`,
    );
    const bodega = await findEntityOrFail(
      this.bodegaRepository,
      { idBodega: bodegaId },
      `La bodega no fue encontrada o no existe`,
    );

    const existencia = await this.existenciaBodegaRepository.preload({
      idExistenciaBodega: id,
      ...toUpdate,
      item,
      bodega,
    });

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

  async buildInventoryStockReportData(
    filters: InventoryStockReportFilterDto,
  ): Promise<InventoryStockReportData> {
    const {
      bodegaId,
      clasificacionId,
      unidadMedidaId,
      search,
      titulo,
      generadoPor,
    } = filters;

    const qb = this.existenciaBodegaRepository
      .createQueryBuilder('existencia')
      .leftJoinAndSelect('existencia.item', 'item')
      .leftJoinAndSelect('item.clasificacion', 'clasificacion')
      .leftJoinAndSelect('item.unidadMedida', 'unidad')
      .leftJoinAndSelect('existencia.bodega', 'bodega');

    if (bodegaId) {
      qb.andWhere('bodega.idBodega = :bodegaId', { bodegaId });
    }
    if (clasificacionId) {
      qb.andWhere('clasificacion.idClasificacion = :clasificacionId', {
        clasificacionId,
      });
    }
    if (unidadMedidaId) {
      qb.andWhere('unidad.idUnidadMedida = :unidadMedidaId', {
        unidadMedidaId,
      });
    }
    if (search) {
      qb.andWhere(
        '(item.descripcion ILIKE :search OR item.codigoItem ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    qb.orderBy('bodega.descripcion', 'ASC').addOrderBy(
      'item.descripcion',
      'ASC',
    );

    const existencias = await qb.getMany();

    const toOptionalNumber = (value: unknown): number | undefined => {
      if (value === undefined || value === null) {
        return undefined;
      }
      const numeric = Number(value);
      return Number.isNaN(numeric) ? undefined : numeric;
    };

    const items = existencias.map((existencia) => {
      const cantDisponibleRaw = Number(existencia.cantDisponible ?? 0);
      const cantDisponible = Number.isNaN(cantDisponibleRaw)
        ? 0
        : cantDisponibleRaw;

      return {
        codigo: existencia.item?.codigoItem ?? '',
        descripcion: existencia.item?.descripcion ?? '',
        bodega: existencia.bodega?.descripcion,
        categoria: existencia.item?.clasificacion?.descripcion,
        unidad: existencia.item?.unidadMedida?.descripcion,
        cantDisponible,
        existenciaMinima: toOptionalNumber(existencia.existenciaMinima),
        puntoReorden: toOptionalNumber(existencia.puntoDeReorden),
        existenciaMaxima: toOptionalNumber(existencia.existenciaMaxima),
      };
    });

    const uniqueString = (
      values: (string | undefined)[],
    ): string | undefined => {
      const filtered = values.filter(
        (value): value is string =>
          typeof value === 'string' && value.trim().length > 0,
      );
      if (filtered.length === 0) {
        return undefined;
      }
      const normalized = Array.from(
        new Set(filtered.map((value) => value.trim())),
      );
      return normalized.join(', ');
    };

    const totalDisponible = items.reduce(
      (acc, item) => acc + Number(item.cantDisponible ?? 0),
      0,
    );
    const totalBodegas = new Set(
      items
        .map((item) => item.bodega)
        .filter(
          (value): value is string =>
            typeof value === 'string' && value.trim().length > 0,
        ),
    ).size;

    const data: InventoryStockReportData = {
      titulo: titulo ?? 'Reporte de existencias de inventario',
      generadoEn: new Date(),
      meta: {
        generadoPor,
        filtros: {
          Bodega: bodegaId
            ? uniqueString(items.map((item) => item.bodega))
            : undefined,
          Clasificacion: clasificacionId
            ? uniqueString(
                existencias.map(
                  (existencia) => existencia.item?.clasificacion?.descripcion,
                ),
              )
            : undefined,
          'Unidad de medida': unidadMedidaId
            ? uniqueString(
                existencias.map(
                  (existencia) => existencia.item?.unidadMedida?.descripcion,
                ),
              )
            : undefined,
          Buscar: search,
        },
      },
      resumen: {
        totalItems: items.length,
        totalBodegas,
        totalDisponible,
      },
      items,
    };

    return data;
  }
}
