import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Factura } from './entities/factura.entity';
import { FacturaFilterDto } from 'src/factura/dto/FacturaFilter.dto';
import { ReciboReportService } from 'src/reports/recibo-report.service';
import { FacturaReciboData } from 'src/reports';
import { Response } from 'express';

@Controller('factura')
@ApiTags('Factura')
export class FacturaController {
  constructor(
    private readonly facturaService: FacturaService,
    private readonly reciboReportService: ReciboReportService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva factura' })
  @ApiResponse({
    status: 201,
    description: 'Factura creada exitosamente',
    type: Factura,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  create(@Body() createFacturaDto: CreateFacturaDto) {
    return this.facturaService.create(createFacturaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las facturas con paginación' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Número de elementos por página',
    example: 10,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Número de elementos a saltar',
    example: 0,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de facturas obtenida exitosamente',
    type: [Factura],
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.facturaService.findAll(paginationDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Busqueda avanzada de facturas' })
  @ApiResponse({
    status: 200,
    description: 'Facturas filtradas correctamente',
    type: [Factura],
  })
  @ApiQuery({ name: 'clienteNombre', required: false })
  @ApiQuery({ name: 'bodegaNombre', required: false })
  @ApiQuery({ name: 'empleadoNombre', required: false })
  @ApiQuery({ name: 'id_cliente', required: false })
  @ApiQuery({ name: 'id_bodega', required: false })
  @ApiQuery({ name: 'id_empleado', required: false })
  @ApiQuery({ name: 'codigo_factura', required: false })
  @ApiQuery({ name: 'codigoLike', required: false })
  @ApiQuery({ name: 'moneda', required: false })
  @ApiQuery({ name: 'tipo_pago', required: false })
  @ApiQuery({ name: 'id_moneda', required: false })
  @ApiQuery({ name: 'id_tipo_pago', required: false })
  @ApiQuery({ name: 'estado', required: false })
  @ApiQuery({ name: 'anulada', required: false })
  @ApiQuery({ name: 'dateFrom', required: false })
  @ApiQuery({ name: 'dateTo', required: false })
  @ApiQuery({ name: 'minTotal', required: false })
  @ApiQuery({ name: 'maxTotal', required: false })
  advancedSearch(@Query() facturaFilterDto: FacturaFilterDto) {
    return this.facturaService.advancedSearch(facturaFilterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una factura por ID' })
  @ApiParam({ name: 'id', description: 'ID de la factura', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Factura encontrada exitosamente',
    type: Factura,
  })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.facturaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una factura' })
  @ApiParam({ name: 'id', description: 'ID de la factura', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Factura actualizada exitosamente',
    type: Factura,
  })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFacturaDto: UpdateFacturaDto,
  ) {
    return this.facturaService.update(id, updateFacturaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una factura' })
  @ApiParam({ name: 'id', description: 'ID de la factura', example: 1 })
  @ApiResponse({ status: 200, description: 'Factura eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.facturaService.remove(id);
  }

  @Get(':id/recibo-pdf')
  @ApiOperation({ summary: 'Generar PDF del recibo de la factura' })
  @ApiParam({ name: 'id', description: 'ID de la factura', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'PDF del recibo generado exitosamente',
  })
  async generateReciboPDF(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    const factura = await this.facturaService.findOne(id);

    // Convertir el total a número para formatear correctamente
    const total = Number(factura.total);

    // Construir el concepto con los items de la factura
    let concepto = `Pago de factura ${factura.codigoFactura}`;
    if (factura.lineas && factura.lineas.length > 0) {
      const items = factura.lineas
        .slice(0, 3)
        .map((linea) => linea.item?.descripcion || 'Item')
        .join(', ');
      concepto = `Pago por ${items}${factura.lineas.length > 3 ? ' y más...' : ''}`;
    }

    const moneda = factura.moneda;

    const reciboData = {
      numeroRecibo: factura.codigoFactura,
      fecha: factura.fecha,
      recibidoDe: factura.cliente.nombre,
      monto: total,
      monedaSimbolo: moneda?.simbolo ?? moneda?.descripcion ?? 'C$',
      monedaDescripcion: moneda?.descripcion,
      montoDescripcion: undefined,
      concepto,
      empleado: factura.empleado
        ? `${factura.empleado.primerNombre} ${factura.empleado.primerApellido}`
        : undefined,
    };

    await this.reciboReportService.generateReciboPDF(reciboData, response);
  }

  @Get(':id/factura-recibo-pdf')
  @ApiOperation({
    summary: 'Generar PDF de la factura en formato preimpreso',
  })
  @ApiParam({ name: 'id', description: 'ID de la factura', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'PDF de la factura generado exitosamente',
  })
  async generateFacturaReciboPDF(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    const factura = await this.facturaService.findOne(id);

    const lineas = (factura.lineas ?? []).map((linea) => ({
      cantidad: Number(linea.cantidad ?? 0),
      descripcion: linea.item?.descripcion ?? 'Item',
      precioUnitario: Number(linea.precioUnitario ?? 0),
      total: Number(linea.totalLinea ?? 0),
    }));

    const facturaReciboData: FacturaReciboData = {
      numeroFactura: factura.codigoFactura,
      fecha: factura.fecha,
      cliente: {
        nombre: factura.cliente?.nombre ?? '',
        direccion: factura.cliente?.direccion ?? undefined,
        ruc: factura.cliente?.ruc ?? undefined,
      },
      condicionPago: factura.tipoPago?.descripcion,
      moneda: factura.moneda?.descripcion,
      monedaSimbolo:
        factura.moneda?.simbolo ?? factura.moneda?.descripcion ?? 'C$',
      subtotal: Number(factura.subtotal ?? 0),
      totalImpuesto: Number(factura.totalImpuesto ?? 0),
      impuestoPorcentaje: factura.impuesto?.porcentaje
        ? Number(factura.impuesto.porcentaje)
        : undefined,
      total: Number(factura.total ?? 0),
      giroCheque: 'MOTO SERVICIOS TERRY Y/O EDUARDO ALBERTO TERRY',
      lineas,
    };

    await this.reciboReportService.generateFacturaReciboPDF(
      facturaReciboData,
      response,
    );
  }
}
