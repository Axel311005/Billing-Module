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
import { FacturaFilterDto } from 'src/common/dtos/FacturaFilter.dto';

@Controller('factura')
@ApiTags('Factura')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

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

  @Get(':search')
  @ApiOperation({ summary: 'Busqueda avanzada de una factura' })
  @ApiResponse({
    status: 201,
    description: 'Factura filtrada correctamente',
    type: Factura,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, Token is not valid or expired',
  })
  advancedSearch(@Body() facturaFilterDto: FacturaFilterDto) {
    return this.facturaService.advancedSearch(facturaFilterDto);
  }
}
