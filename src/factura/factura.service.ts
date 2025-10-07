import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { TipoPago } from 'src/tipo-pago/entities/tipo-pago.entity';
import { Moneda } from 'src/moneda/entities/moneda.entity';
import { Impuesto } from 'src/impuesto/entities/impuesto.entity';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';
import { Bodega } from 'src/bodega/entities/bodega.entity';
import { Consecutivo } from 'src/consecutivo/entities/consecutivo.entity';
import { ConsecutivoService } from 'src/consecutivo/consecutivo.service';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import {
  FacturaFilterDto,
  FacturaSortBy,
} from 'src/common/dtos/FacturaFilter.dto';

@Injectable()
export class FacturaService {
  private readonly logger = new Logger('FacturaService');

  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(TipoPago)
    private readonly tipoPagoRepository: Repository<TipoPago>,
    @InjectRepository(Moneda)
    private readonly monedaRepository: Repository<Moneda>,
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

  async create(createFacturaDto: CreateFacturaDto) {
    try {
      let {
        clienteId,
        tipoPagoId,
        monedaId,
        impuestoId,
        tipoCambioUsado,
        bodegaId,
        consecutivoId,
        empleadoId,
        ...factura
      } = createFacturaDto;
      const empleado = await findEntityOrFail(
        this.empleadoRepository,
        { idEmpleado: empleadoId },
        `El empleado no fue encontrado o no existe`,
      );

      const cliente = await findEntityOrFail(
        this.clienteRepository,
        { idCliente: clienteId },
        `El cliente no fue encontrado o no existe`,
      );
      const tipoPago = await findEntityOrFail(
        this.tipoPagoRepository,
        { idTipoPago: tipoPagoId },
        `El tipo de pago no fue encontrado o no existe`,
      );
      const moneda = await findEntityOrFail(
        this.monedaRepository,
        { idMoneda: monedaId },
        `La moneda no fue encontrada o no existe`,
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

      const codigoFactura =
        await this.consecutivoService.obtenerSiguienteConsecutivo('FACTURA');

      tipoCambioUsado = moneda.tipoCambio;

      const nuevaFactura = this.facturaRepository.create({
        ...factura,
        cliente,
        tipoPago,
        moneda,
        impuesto,
        tipoCambioUsado,
        bodega,
        consecutivo,
        codigoFactura,
        empleado,
      });

      await this.facturaRepository.save(nuevaFactura);

      return await this.facturaRepository.findOne({
        where: { id_factura: nuevaFactura.id_factura },
        relations: [
          'cliente',
          'tipoPago',
          'moneda',
          'impuesto',
          'lineas',
          'bodega',
          'consecutivo',
        ],
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
    const facturas = await this.facturaRepository.find({
      take: limit,
      skip: offset,
      relations: [
        'cliente',
        'tipoPago',
        'moneda',
        'impuesto',
        'lineas',
        'bodega',
        'consecutivo',
      ],
    });

    return facturas;
  }

  async findOne(id: number) {
    const factura = await this.facturaRepository.findOne({
      where: { id_factura: id },
      relations: [
        'cliente',
        'tipoPago',
        'moneda',
        'impuesto',
        'lineas',
        'bodega',
        'consecutivo',
      ],
    });

    if (!factura) {
      throw new NotFoundException(`La factura con id ${id} no fue encontrada`);
    }

    return factura;
  }

  async update(id: number, updateFacturaDto: UpdateFacturaDto) {
    let {
      clienteId,
      tipoPagoId,
      monedaId,
      impuestoId,
      tipoCambioUsado,
      bodegaId,
      empleadoId,
      ...toUpdate
    } = updateFacturaDto;
    let empleado: Empleado | null = null;
    if (empleadoId) {
      empleado = await findEntityOrFail(
        this.empleadoRepository,
        { idEmpleado: empleadoId },
        `El empleado no fue encontrado o no existe`,
      );
    }

    const cliente = await findEntityOrFail(
      this.clienteRepository,
      { idCliente: clienteId },
      `El cliente no fue encontrado o no existe`,
    );
    const tipoPago = await findEntityOrFail(
      this.tipoPagoRepository,
      { idTipoPago: tipoPagoId },
      `El tipo de pago no fue encontrado o no existe`,
    );
    const moneda = await findEntityOrFail(
      this.monedaRepository,
      { idMoneda: monedaId },
      `La moneda no fue encontrada o no existe`,
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

    const factura = await this.facturaRepository.preload({
      id_factura: id,
      ...toUpdate,
      cliente,
      tipoPago,
      moneda,
      impuesto,
      tipoCambioUsado,
      bodega,
      empleado: empleado ?? undefined,
    });

    if (!factura) {
      console.log(`La factura con id ${id} no fue encontrada`);
      throw new NotFoundException(`La factura no fue encontrada`);
    }

    return this.facturaRepository.save(factura);
  }

  async remove(id: number) {
    const factura = await this.findOne(id);
    await this.facturaRepository.remove(factura!);
  }

  async advancedSearch(dto: FacturaFilterDto) {
    const {
      clienteNombre,
      bodegaNombre,
      empleadoNombre,
      id_cliente,
      id_bodega,
      id_empleado,
      codigo_factura,
      codigoLike,
      estado,
      anulada,
      dateFrom,
      dateTo,
      minTotal,
      maxTotal,
      page = 1,
      limit = 10,
      sortBy = FacturaSortBy.FECHA,
      sortDir = 'DESC',
    } = dto;

    const qb = this.facturaRepository
      .createQueryBuilder('f')
      // Relaciones según entity: cliente, bodega, empleado
      .leftJoinAndSelect('f.cliente', 'c')
      .leftJoinAndSelect('f.bodega', 'b')
      .leftJoinAndSelect('f.empleado', 'e');

    if (clienteNombre)
      qb.andWhere('c.nombre ILIKE :cNom', { cNom: `%${clienteNombre}%` });
    if (bodegaNombre)
      qb.andWhere('b.descripcion ILIKE :bNom', { bNom: `%${bodegaNombre}%` });
    if (empleadoNombre)
      qb.andWhere('(e.primer_nombre ILIKE :eNom)', {
        eNom: `%${empleadoNombre}%`,
      });

    if (id_cliente) qb.andWhere('c.id_cliente = :idc', { idc: id_cliente });
    if (id_bodega) qb.andWhere('b.id_bodega = :idb', { idb: id_bodega });
    if (id_empleado) qb.andWhere('e.id_empleado = :ide', { ide: id_empleado });

    if (codigo_factura)
      qb.andWhere('f.codigo_factura = :cod', { cod: codigo_factura });
    if (codigoLike)
      qb.andWhere('f.codigo_factura ILIKE :codLike', {
        codLike: `%${codigoLike}%`,
      });

    if (estado) qb.andWhere('f.estado = :est', { est: estado });
    if (anulada !== undefined)
      qb.andWhere('f.anulada = :anu', { anu: anulada });

    if (dateFrom) qb.andWhere('f.fecha >= :df', { df: dateFrom });
    if (dateTo) qb.andWhere('f.fecha <= :dt', { dt: dateTo });

    if (minTotal)
      qb.andWhere('CAST(f.total AS NUMERIC) >= :minT', { minT: minTotal });
    if (maxTotal)
      qb.andWhere('CAST(f.total AS NUMERIC) <= :maxT', { maxT: maxTotal });

    const sortMap: Record<FacturaSortBy, string> = {
      [FacturaSortBy.FECHA]: 'f.fecha',
      [FacturaSortBy.TOTAL]: 'f.total',
      [FacturaSortBy.CODIGO]: 'f.codigo_factura',
      [FacturaSortBy.CLIENTE]: 'c.nombre',
      [FacturaSortBy.BODEGA]: 'b.descripcion',
      [FacturaSortBy.EMPLEADO]: 'e.primer_nombre',
    };
    qb.orderBy(sortMap[sortBy] ?? 'f.fecha', sortDir as 'ASC' | 'DESC');

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
