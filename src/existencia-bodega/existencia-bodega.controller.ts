import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ExistenciaBodegaService } from './existencia-bodega.service';
import { CreateExistenciaBodegaDto } from './dto/create-existencia-bodega.dto';
import { UpdateExistenciaBodegaDto } from './dto/update-existencia-bodega.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ExistenciaBodega } from './entities/existencia-bodega.entity';
import { ReciboReportService } from 'src/reports/recibo-report.service';
import { InventoryStockReportFilterDto } from './dto/inventory-report.dto';
import { Response } from 'express';

@Controller('existencia-bodega')
@ApiTags('Existencia Bodega')
export class ExistenciaBodegaController {
  constructor(
    private readonly existenciaBodegaService: ExistenciaBodegaService,
    private readonly reciboReportService: ReciboReportService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva existencia de bodega' })
  @ApiResponse({
    status: 201,
    description: 'Existencia de bodega creada exitosamente',
    type: ExistenciaBodega,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  create(@Body() createExistenciaBodegaDto: CreateExistenciaBodegaDto) {
    return this.existenciaBodegaService.create(createExistenciaBodegaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las existencias de bodega con paginación',
  })
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
    description: 'Lista de existencias de bodega obtenida exitosamente',
    type: [ExistenciaBodega],
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.existenciaBodegaService.findAll(paginationDto);
  }

  @Get('report/inventario')
  @ApiOperation({ summary: 'Generar reporte PDF de existencias de inventario' })
  @ApiResponse({ status: 200, description: 'Reporte generado correctamente' })
  async generateInventoryReport(
    @Query() filters: InventoryStockReportFilterDto,
    @Res() response: Response,
  ) {
    const reportData =
      await this.existenciaBodegaService.buildInventoryStockReportData(filters);
    await this.reciboReportService.generateInventoryStockPDF(
      reportData,
      response,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una existencia de bodega por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la existencia de bodega',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Existencia de bodega encontrada exitosamente',
    type: ExistenciaBodega,
  })
  @ApiResponse({
    status: 404,
    description: 'Existencia de bodega no encontrada',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.existenciaBodegaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una existencia de bodega' })
  @ApiParam({
    name: 'id',
    description: 'ID de la existencia de bodega',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Existencia de bodega actualizada exitosamente',
    type: ExistenciaBodega,
  })
  @ApiResponse({
    status: 404,
    description: 'Existencia de bodega no encontrada',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExistenciaBodegaDto: UpdateExistenciaBodegaDto,
  ) {
    return this.existenciaBodegaService.update(id, updateExistenciaBodegaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una existencia de bodega' })
  @ApiParam({
    name: 'id',
    description: 'ID de la existencia de bodega',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Existencia de bodega eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Existencia de bodega no encontrada',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.existenciaBodegaService.remove(id);
  }
}
