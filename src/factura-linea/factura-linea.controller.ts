import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { FacturaLineaService } from './factura-linea.service';
import { CreateFacturaLineaDto } from './dto/create-factura-linea.dto';
import { UpdateFacturaLineaDto } from './dto/update-factura-linea.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { FacturaLinea } from './entities/factura-linea.entity';

@Controller('factura-linea')
@ApiTags('Factura Linea')
export class FacturaLineaController {
  constructor(private readonly facturaLineaService: FacturaLineaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva línea de factura' })
  @ApiResponse({status: 201, description: 'Línea de factura creada exitosamente', type: FacturaLinea})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createFacturaLineaDto: CreateFacturaLineaDto) {
    return this.facturaLineaService.create(createFacturaLineaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las líneas de factura con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de líneas de factura obtenida exitosamente', type: [FacturaLinea]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.facturaLineaService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una línea de factura por ID' })
  @ApiParam({ name: 'id', description: 'ID de la línea de factura', example: 1 })
  @ApiResponse({status: 200, description: 'Línea de factura encontrada exitosamente', type: FacturaLinea})
  @ApiResponse({status: 404, description: 'Línea de factura no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.facturaLineaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una línea de factura' })
  @ApiParam({ name: 'id', description: 'ID de la línea de factura', example: 1 })
  @ApiResponse({status: 200, description: 'Línea de factura actualizada exitosamente', type: FacturaLinea})
  @ApiResponse({status: 404, description: 'Línea de factura no encontrada'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateFacturaLineaDto: UpdateFacturaLineaDto) {
    return this.facturaLineaService.update(id, updateFacturaLineaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una línea de factura' })
  @ApiParam({ name: 'id', description: 'ID de la línea de factura', example: 1 })
  @ApiResponse({status: 200, description: 'Línea de factura eliminada exitosamente'})
  @ApiResponse({status: 404, description: 'Línea de factura no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.facturaLineaService.remove(id);
  }
}
