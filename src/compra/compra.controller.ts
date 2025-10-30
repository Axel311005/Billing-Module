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
} from '@nestjs/common';
import { CompraService } from './compra.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Compra } from './entities/compra.entity';
import { CompraFilterDto } from './dto/CompraFilter.dto';

@Controller('compra')
@ApiTags('Compra')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva compra' })
  @ApiResponse({
    status: 201,
    description: 'Compra creada exitosamente',
    type: Compra,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  create(@Body() createCompraDto: CreateCompraDto) {
    return this.compraService.create(createCompraDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las compras con paginación' })
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
    description: 'Lista de compras obtenida exitosamente',
    type: [Compra],
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.compraService.findAll(paginationDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Busqueda avanzada de compras' })
  @ApiResponse({
    status: 200,
    description: 'Compras filtradas correctamente',
    type: [Compra],
  })
  @ApiQuery({ name: 'bodegaNombre', required: false })
  @ApiQuery({ name: 'empleadoNombre', required: false })
  @ApiQuery({ name: 'moneda', required: false })
  @ApiQuery({ name: 'tipo_pago', required: false })
  @ApiQuery({ name: 'id_bodega', required: false })
  @ApiQuery({ name: 'id_empleado', required: false })
  @ApiQuery({ name: 'id_moneda', required: false })
  @ApiQuery({ name: 'id_tipo_pago', required: false })
  @ApiQuery({ name: 'codigo_compra', required: false })
  @ApiQuery({ name: 'codigoLike', required: false })
  @ApiQuery({ name: 'estado', required: false })
  @ApiQuery({ name: 'anulado', required: false })
  @ApiQuery({ name: 'dateFrom', required: false })
  @ApiQuery({ name: 'dateTo', required: false })
  @ApiQuery({ name: 'minTotal', required: false })
  @ApiQuery({ name: 'maxTotal', required: false })
  advancedSearch(@Query() compraFilterDto: CompraFilterDto) {
    return this.compraService.advancedSearch(compraFilterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una compra por ID' })
  @ApiParam({ name: 'id', description: 'ID de la compra', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Compra encontrada exitosamente',
    type: Compra,
  })
  @ApiResponse({ status: 404, description: 'Compra no encontrada' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.compraService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una compra' })
  @ApiParam({ name: 'id', description: 'ID de la compra', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Compra actualizada exitosamente',
    type: Compra,
  })
  @ApiResponse({ status: 404, description: 'Compra no encontrada' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompraDto: UpdateCompraDto,
  ) {
    return this.compraService.update(id, updateCompraDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una compra' })
  @ApiParam({ name: 'id', description: 'ID de la compra', example: 1 })
  @ApiResponse({ status: 200, description: 'Compra eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Compra no encontrada' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.compraService.remove(id);
  }
}
