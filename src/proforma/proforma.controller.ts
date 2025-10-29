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
import { ProformaService } from './proforma.service';
import { CreateProformaDto } from './dto/create-proforma.dto';
import { UpdateProformaDto } from './dto/update-proforma.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Proforma } from './entities/proforma.entity';
import { ReciboReportService } from 'src/reports/recibo-report.service';
import { Response } from 'express';
import { ProformaReportData } from 'src/reports/proforma.report';

@Controller('proforma')
@ApiTags('Proforma')
export class ProformaController {
  constructor(
    private readonly proformaService: ProformaService,
    private readonly reciboReportService: ReciboReportService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva proforma' })
  @ApiResponse({
    status: 201,
    description: 'Proforma creada exitosamente',
    type: Proforma,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  create(@Body() createProformaDto: CreateProformaDto) {
    return this.proformaService.create(createProformaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las proformas con paginación' })
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
    description: 'Lista de proformas obtenida exitosamente',
    type: [Proforma],
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.proformaService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una proforma por ID' })
  @ApiParam({ name: 'id', description: 'ID de la proforma', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Proforma encontrada exitosamente',
    type: Proforma,
  })
  @ApiResponse({ status: 404, description: 'Proforma no encontrada' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.proformaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una proforma' })
  @ApiParam({ name: 'id', description: 'ID de la proforma', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Proforma actualizada exitosamente',
    type: Proforma,
  })
  @ApiResponse({ status: 404, description: 'Proforma no encontrada' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProformaDto: UpdateProformaDto,
  ) {
    return this.proformaService.update(id, updateProformaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una proforma' })
  @ApiParam({ name: 'id', description: 'ID de la proforma', example: 1 })
  @ApiResponse({ status: 200, description: 'Proforma eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Proforma no encontrada' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.proformaService.remove(id);
  }

  @Get(':id/proforma-pdf')
  @ApiOperation({ summary: 'Generar PDF de la proforma' })
  @ApiParam({ name: 'id', description: 'ID de la proforma', example: 1 })
  @ApiResponse({ status: 200, description: 'PDF generado exitosamente' })
  async generateProformaPdf(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): Promise<void> {
    const proforma = await this.proformaService.findOne(id);

    const lineas = (proforma.lineas ?? []).map((linea) => {
      const cantidad = Number(linea.cantidad ?? 0);
      const precioUnitario = Number(linea.precioUnitario ?? 0);
      const total = Number(linea.totalLinea ?? cantidad * precioUnitario);

      return {
        cantidad,
        descripcion: linea.item?.descripcion ?? '',
        precioUnitario,
        total,
      };
    });

    const subtotalCalculado = lineas.reduce(
      (acc, linea) => acc + Number(linea.total ?? 0),
      0,
    );
    const subtotalValor = Number(proforma.subtotal ?? subtotalCalculado);
    const subtotal = Number(subtotalValor.toFixed(2));

    const ivaPorcentaje = (() => {
      const porcentaje = proforma.impuesto?.porcentaje;
      if (porcentaje === undefined || porcentaje === null) {
        return undefined;
      }
      return Number(porcentaje);
    })();

    const ivaBase = (() => {
      if (ivaPorcentaje !== undefined) {
        return subtotal * (ivaPorcentaje / 100);
      }
      return Number(proforma.totalImpuesto ?? 0);
    })();

    const ivaValor = Number(proforma.totalImpuesto ?? ivaBase);
    const iva = Number(ivaValor.toFixed(2));

    const totalEstimadoValor =
      proforma.totalEstimado ??
      subtotal + (ivaPorcentaje !== undefined ? iva : ivaBase);
    const total = Number(Number(totalEstimadoValor).toFixed(2));

    const tramiteSeguro = proforma.tramiteSeguro;
    const vehiculo = tramiteSeguro?.vehiculo;
    const cliente = tramiteSeguro?.cliente;
    const moneda = proforma.moneda;

    const fechaDocumento = new Date();

    const proformaData: ProformaReportData = {
      numeroProforma:
        proforma.codigoProforma ??
        proforma.consecutivo?.descripcion ??
        `PROF-${proforma.idProforma}`,
      fecha: fechaDocumento,
      vehiculo: {
        expediente: tramiteSeguro?.numeroTramite ?? undefined,
        clienteNombre: cliente?.nombre ?? '',
        celular: cliente?.telefono ?? '',
        modelo: vehiculo?.modelo ?? '',
        motor: vehiculo?.motor ?? '',
        chasis: vehiculo?.numChasis ?? '',
        placa: vehiculo?.placa ?? '',
        color: vehiculo?.color ?? '',
        anio: vehiculo?.anio ?? '',
      },
      monedaSimbolo: moneda?.simbolo ?? moneda?.descripcion ?? 'C$',
      monedaNombre: moneda?.descripcion,
      subtotal,
      iva,
      ivaPorcentaje,
      total,
      lineas,
      observaciones: proforma.observaciones ?? undefined,
    };

    await this.reciboReportService.generateProformaPDF(proformaData, response);
  }
}
