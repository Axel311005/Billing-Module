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
  ){}

  async create(createFacturaDto: CreateFacturaDto) {
    try {
      
      let {
        clienteId, tipoPagoId, monedaId, impuestoId, tipoCambioUsado, bodegaId,...factura
      } = createFacturaDto;

      const cliente = await findEntityOrFail(
        this.clienteRepository, {idCliente: clienteId}, 
        `El cliente no fue encontrado o no existe`
      );
      const tipoPago = await findEntityOrFail(
        this.tipoPagoRepository, {idTipoPago: tipoPagoId}, 
        `El tipo de pago no fue encontrado o no existe`
      );
      const moneda = await findEntityOrFail(
        this.monedaRepository, {idMoneda: monedaId}, 
        `La moneda no fue encontrada o no existe`
      );
      const impuesto = await findEntityOrFail(
        this.impuestoRepository, {idImpuesto: impuestoId}, 
        `El impuesto no fue encontrado o no existe`
      );
      const bodega = await findEntityOrFail(
        this.bodegaRepository, {idBodega: bodegaId}, 
        `La bodega no fue encontrado o no existe`
      );

      tipoCambioUsado = moneda.tipoCambio



      const nuevaFactura = this.facturaRepository.create({
        ...factura,
        cliente,
        tipoPago,
        moneda,
        impuesto,
        tipoCambioUsado,
        bodega
      })

      await this.facturaRepository.save(nuevaFactura);

      return await this.facturaRepository.findOne({
        where : {id_factura : nuevaFactura.id_factura},
        relations: ['cliente', 'tipoPago', 'moneda', 'impuesto', 'lineas', 'bodega']
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
    const facturas = await this.facturaRepository.find({
      take:limit,
      skip : offset,
      relations: ['cliente', 'tipoPago', 'moneda', 'impuesto', 'lineas', 'bodega']
    })

    return facturas;
  }

  async findOne(id: number) {
    const factura = await this.facturaRepository.findOne({
      where: {id_factura : id},
      relations: ['cliente', 'tipoPago', 'moneda', 'impuesto', 'lineas', 'bodega']
    });

    if (!factura) {
      throw new NotFoundException(`La factura con id ${id} no fue encontrada`);
    }

    return factura;
  }

  async update(id: number, updateFacturaDto: UpdateFacturaDto) {
    let {clienteId, tipoPagoId, monedaId, impuestoId, tipoCambioUsado, bodegaId,...toUpdate} = updateFacturaDto;

    const cliente = await findEntityOrFail(
      this.clienteRepository, {idCliente: clienteId}, 
      `El cliente no fue encontrado o no existe`
    );
    const tipoPago = await findEntityOrFail(
      this.tipoPagoRepository, {idTipoPago: tipoPagoId}, 
      `El tipo de pago no fue encontrado o no existe`
    );
    const moneda = await findEntityOrFail(
      this.monedaRepository, {idMoneda: monedaId}, 
      `La moneda no fue encontrada o no existe`
    );
    const impuesto = await findEntityOrFail(
      this.impuestoRepository, {idImpuesto: impuestoId}, 
      `El impuesto no fue encontrado o no existe`
    );

    const bodega = await findEntityOrFail(
      this.bodegaRepository, {idBodega: bodegaId}, 
      `La bodega no fue encontrado o no existe`
    );

    tipoCambioUsado = moneda.tipoCambio

    const factura = await this.facturaRepository.preload({
      id_factura : id, 
      ...toUpdate,
      cliente,
      tipoPago,
      moneda,
      impuesto,
      tipoCambioUsado,
      bodega
    })

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
}
