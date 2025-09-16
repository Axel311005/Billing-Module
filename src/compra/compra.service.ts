import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
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
    private readonly consecutivoRepo : Repository<Consecutivo>,

    
    private readonly consecutivoService : ConsecutivoService
  ){}

  async create(createCompraDto: CreateCompraDto) {
    try {
      
      let {monedaId, tipoPagoId, impuestoId, tipoCambioUsado, bodegaId, codigoCompra, consecutivoId,...compra} = createCompraDto;

      const moneda = await findEntityOrFail(
        this.monedaRepository, {idMoneda: monedaId}, 
        `La moneda no fue encontrada o no existe`
      );
      const tipoPago = await findEntityOrFail(
        this.tipoPagoRepository, {idTipoPago: tipoPagoId}, 
        `El tipo de pago no fue encontrado o no existe`
      );
      const impuesto = await findEntityOrFail(
        this.impuestoRepository, {idImpuesto: impuestoId}, 
        `El impuesto no fue encontrado o no existe`
      );
      const bodega = await findEntityOrFail(
        this.bodegaRepository, {idBodega: bodegaId}, 
        `La bodega no fue encontrado o no existe`
      );

      const consecutivo = await findEntityOrFail(
        this.consecutivoRepo, {idConsecutivo : consecutivoId},
        `El consecutivo no fue encontrado o no existe`
      )

      codigoCompra = await this.consecutivoService.obtenerSiguienteConsecutivo('COMPRA');
      

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
      })

      await this.compraRepository.save(nuevaCompra);

      return await this.compraRepository.findOne({
        where : {idCompra : nuevaCompra.idCompra},
        relations: ['moneda', 'tipoPago', 'impuesto', 'lineas','bodega']
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
    const compras = await this.compraRepository.find({
      take:limit,
      skip : offset,
      relations: ['moneda', 'tipoPago', 'impuesto', 'lineas', 'bodega']
    })

    return compras;
  }

  async findOne(id: number) {
    const compra = await this.compraRepository.findOne({
      where: {idCompra : id},
      relations: ['moneda', 'tipoPago', 'impuesto', 'lineas', 'bodega']
    });

    if (!compra) {
      throw new NotFoundException(`La compra con id ${id} no fue encontrada`);
    }

    return compra;
  }

  async update(id: number, updateCompraDto: UpdateCompraDto) {
    let {monedaId, tipoPagoId, impuestoId, tipoCambioUsado,bodegaId, ...toUpdate} = updateCompraDto;

    const moneda = await findEntityOrFail(
      this.monedaRepository, {idMoneda: monedaId}, 
      `La moneda no fue encontrada o no existe`
    );
    const tipoPago = await findEntityOrFail(
      this.tipoPagoRepository, {idTipoPago: tipoPagoId}, 
      `El tipo de pago no fue encontrado o no existe`
    );
    const impuesto = await findEntityOrFail(
      this.impuestoRepository, {idImpuesto: impuestoId}, 
      `El impuesto no fue encontrado o no existe`
    );

    const bodega = await findEntityOrFail(
      this.bodegaRepository, {idBodega: bodegaId}, 
      `La bodega no fue encontrado o no existe`
    );

    tipoCambioUsado = moneda.tipoCambio;

    const compra = await this.compraRepository.preload({
      idCompra : id, 
      ...toUpdate,
      moneda,
      tipoPago,
      impuesto,
      tipoCambioUsado,
      bodega
    })

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
}
