import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compra } from './entities/compra.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Moneda } from 'src/moneda/entities/moneda.entity';
import { TipoPago } from 'src/tipo-pago/entities/tipo-pago.entity';
import { Impuesto } from 'src/impuesto/entities/impuesto.entity';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';
import { Bodega } from 'src/bodega/entities/bodega.entity';
import { Consecutivo } from 'src/consecutivo/entities/consecutivo.entity';
import { ConsecutivoService } from 'src/consecutivo/consecutivo.service';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { CompraFilterDto, CompraSortBy } from './dto/CompraFilter.dto';

@Injectable()
export class CompraService {
  private readonly logger = new Logger('CompraService');

  constructor(
    @InjectRepository(Compra)
    private readonly compraRepository: Repository<Compra>,
    @InjectRepository(Moneda)
    private readonly monedaRepository: Repository<Moneda>,
    @InjectRepository(TipoPago)
    private readonly tipoPagoRepository: Repository<TipoPago>,
    @InjectRepository(Impuesto)
    private readonly impuestoRepository: Repository<Impuesto>,
    @InjectRepository(Bodega)
    private readonly bodegaRepository: Repository<Bodega>,
    @InjectRepository(Consecutivo)
    private readonly consecutivoRepo: Repository<Consecutivo>,
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,

    private readonly consecutivoService: ConsecutivoService,
  ) {}

  async create(createCompraDto: CreateCompraDto) {
    try {
      let {
        monedaId,
        tipoPagoId,
        impuestoId,
        tipoCambioUsado,
        bodegaId,
        consecutivoId,
        empleadoId,
        ...compra
      } = createCompraDto;
      const empleado = await findEntityOrFail(
        this.empleadoRepository,
        { idEmpleado: empleadoId },
        `El empleado no fue encontrado o no existe`,
      );

      const moneda = await findEntityOrFail(
        this.monedaRepository,
        { idMoneda: monedaId },
        `La moneda no fue encontrada o no existe`,
      );
      const tipoPago = await findEntityOrFail(
        this.tipoPagoRepository,
        { idTipoPago: tipoPagoId },
        `El tipo de pago no fue encontrado o no existe`,
      );
      const impuesto = await findEntityOrFail(
        this.impuestoRepository,
        { idImpuesto: impuestoId },
        `El impuesto no fue encontrado o no existe`,
      );
      const bodega = await findEntityOrFail(
        this.bodegaRepository,
        { idBodega: bodegaId },
        `La bodega no fue encontrado o no existe`,
      );

      const consecutivo = await findEntityOrFail(
        this.consecutivoRepo,
        { idConsecutivo: consecutivoId },
        `El consecutivo no fue encontrado o no existe`,
      );

      const codigoCompra =
        await this.consecutivoService.obtenerSiguienteConsecutivo('COMPRA');

      tipoCambioUsado = moneda.tipoCambio;

      const nuevaCompra = this.compraRepository.create({
        ...compra,
        moneda,
        tipoPago,
        impuesto,
        tipoCambioUsado,
        bodega,
        consecutivo,
        codigoCompra,
        empleado,
      });

      await this.compraRepository.save(nuevaCompra);

      return await this.compraRepository.findOne({
        where: { idCompra: nuevaCompra.idCompra },
        relations: ['moneda', 'tipoPago', 'impuesto', 'lineas', 'bodega'],
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
    const compras = await this.compraRepository.find({
      take: limit,
      skip: offset,
      relations: ['moneda', 'tipoPago', 'impuesto', 'lineas', 'bodega'],
    });

    return compras;
  }

  async findOne(id: number) {
    const compra = await this.compraRepository.findOne({
      where: { idCompra: id },
      relations: ['moneda', 'tipoPago', 'impuesto', 'lineas', 'bodega'],
    });

    if (!compra) {
      throw new NotFoundException(`La compra con id ${id} no fue encontrada`);
    }

    return compra;
  }

  async update(id: number, updateCompraDto: UpdateCompraDto) {
    let {
      monedaId,
      tipoPagoId,
      impuestoId,
      tipoCambioUsado,
      bodegaId,
      empleadoId,
      ...toUpdate
    } = updateCompraDto;
    let empleado: Empleado | null = null;
    if (empleadoId) {
      empleado = await findEntityOrFail(
        this.empleadoRepository,
        { idEmpleado: empleadoId },
        `El empleado no fue encontrado o no existe`,
      );
    }

    const moneda = await findEntityOrFail(
      this.monedaRepository,
      { idMoneda: monedaId },
      `La moneda no fue encontrada o no existe`,
    );
    const tipoPago = await findEntityOrFail(
      this.tipoPagoRepository,
      { idTipoPago: tipoPagoId },
      `El tipo de pago no fue encontrado o no existe`,
    );
    const impuesto = await findEntityOrFail(
      this.impuestoRepository,
      { idImpuesto: impuestoId },
      `El impuesto no fue encontrado o no existe`,
    );

    const bodega = await findEntityOrFail(
      this.bodegaRepository,
      { idBodega: bodegaId },
      `La bodega no fue encontrado o no existe`,
    );

    tipoCambioUsado = moneda.tipoCambio;

    const compra = await this.compraRepository.preload({
      idCompra: id,
      ...toUpdate,
      moneda,
      tipoPago,
      impuesto,
      tipoCambioUsado,
      bodega,
      empleado: empleado ?? undefined,
    });

    if (!compra) {
      console.log(`La compra con id ${id} no fue encontrada`);
      throw new NotFoundException(`La compra no fue encontrada`);
    }

    return this.compraRepository.save(compra);
  }

  async remove(id: number) {
    const compra = await this.findOne(id);
    await this.compraRepository.remove(compra!);
  }

  async advancedSearch(dto: CompraFilterDto) {
    const {
      bodegaNombre,
      empleadoNombre,
      tipo_pago,
      moneda,
      id_bodega,
      id_empleado,
      id_tipo_pago,
      id_moneda,
      codigo_compra,
      codigoLike,
      estado,
      anulado,
      dateFrom,
      dateTo,
      minTotal,
      maxTotal,
      page = 1,
      limit = 10,
      sortBy = CompraSortBy.FECHA,
      sortDir = 'DESC',
    } = dto;

    const qb = this.compraRepository
      .createQueryBuilder('co')
      .leftJoinAndSelect('co.bodega', 'b')
      .leftJoinAndSelect('co.empleado', 'e')
      .leftJoinAndSelect('co.moneda', 'm')
      .leftJoinAndSelect('co.tipoPago', 'tp');

    if (bodegaNombre)
      qb.andWhere('b.descripcion ILIKE :bNom', { bNom: `%${bodegaNombre}%` });
    if (empleadoNombre)
      qb.andWhere(
        '(e.primer_nombre ILIKE :eNom OR e.primer_apellido ILIKE :eNom)',
        { eNom: `%${empleadoNombre}%` },
      );
    if (moneda)
      qb.andWhere('m.descripcion ILIKE :mNom', { mNom: `%${moneda}%` });
    if (tipo_pago)
      qb.andWhere('tp.descripcion ILIKE :tpNom', { tpNom: `%${tipo_pago}%` });

    if (id_bodega) qb.andWhere('b.id_bodega = :idb', { idb: id_bodega });
    if (id_empleado) qb.andWhere('e.id_empleado = :ide', { ide: id_empleado });
    if (id_moneda) qb.andWhere('m.id_moneda = :idm', { idm: id_moneda });
    if (id_tipo_pago)
      qb.andWhere('tp.id_tipo_pago = :idtp', { idtp: id_tipo_pago });

    if (codigo_compra)
      qb.andWhere('co.codigo_compra = :cod', { cod: codigo_compra });
    if (codigoLike)
      qb.andWhere('co.codigo_compra ILIKE :codLike', {
        codLike: `%${codigoLike}%`,
      });

    if (estado) qb.andWhere('co.estado = :est', { est: estado });
    if (anulado !== undefined)
      qb.andWhere('co.anulado = :anu', { anu: anulado });

    if (dateFrom) qb.andWhere('co.fecha >= :df', { df: dateFrom });
    if (dateTo) qb.andWhere('co.fecha <= :dt', { dt: dateTo });

    if (minTotal)
      qb.andWhere('CAST(co.total AS NUMERIC) >= :minT', { minT: minTotal });
    if (maxTotal)
      qb.andWhere('CAST(co.total AS NUMERIC) <= :maxT', { maxT: maxTotal });

    const sortMap: Record<CompraSortBy, string> = {
      [CompraSortBy.FECHA]: 'co.fecha',
      [CompraSortBy.TOTAL]: 'co.total',
      [CompraSortBy.CODIGO]: 'co.codigo_compra',
      [CompraSortBy.BODEGA]: 'b.descripcion',
      [CompraSortBy.EMPLEADO]: 'e.primer_nombre',
      [CompraSortBy.TIPO_PAGO]: 'tp.descripcion',
      [CompraSortBy.MONEDA]: 'm.descripcion',
    };

    qb.orderBy(sortMap[sortBy] ?? 'co.fecha', sortDir as 'ASC' | 'DESC');

    qb.take(limit).skip((page - 1) * limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
