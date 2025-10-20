import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { DetalleCotizacionService } from './detalle-cotizacion.service';
import { CreateDetalleCotizacionDto } from './dto/create-detalle-cotizacion.dto';
import { UpdateDetalleCotizacionDto } from './dto/update-detalle-cotizacion.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { DetalleCotizacion } from './entities/detalle-cotizacion.entity';

@Controller('detalle-cotizacion')
@ApiTags('DetalleCotizacion')
export class DetalleCotizacionController {
  constructor(private readonly detalleCotizacionService: DetalleCotizacionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo detalle de cotización' })
  @ApiResponse({status: 201, description: 'Detalle de cotización creado exitosamente', type: DetalleCotizacion})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createDetalleCotizacionDto: CreateDetalleCotizacionDto) {
    return this.detalleCotizacionService.create(createDetalleCotizacionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los detalles de cotización con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de detalles de cotización obtenida exitosamente', type: [DetalleCotizacion]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.detalleCotizacionService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un detalle de cotización por ID' })
  @ApiParam({ name: 'id', description: 'ID del detalle de cotización', example: 1 })
  @ApiResponse({status: 200, description: 'Detalle de cotización encontrado exitosamente', type: DetalleCotizacion})
  @ApiResponse({status: 404, description: 'Detalle de cotización no encontrado'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.detalleCotizacionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un detalle de cotización' })
  @ApiParam({ name: 'id', description: 'ID del detalle de cotización', example: 1 })
  @ApiResponse({status: 200, description: 'Detalle de cotización actualizado exitosamente', type: DetalleCotizacion})
  @ApiResponse({status: 404, description: 'Detalle de cotización no encontrado'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDetalleCotizacionDto: UpdateDetalleCotizacionDto) {
    return this.detalleCotizacionService.update(id, updateDetalleCotizacionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un detalle de cotización' })
  @ApiParam({ name: 'id', description: 'ID del detalle de cotización', example: 1 })
  @ApiResponse({status: 200, description: 'Detalle de cotización eliminado exitosamente'})
  @ApiResponse({status: 404, description: 'Detalle de cotización no encontrado'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.detalleCotizacionService.remove(id);
  }
}
