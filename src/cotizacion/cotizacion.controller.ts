import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { CotizacionService } from './cotizacion.service';
import { CreateCotizacionDto } from './dto/create-cotizacion.dto';
import { UpdateCotizacionDto } from './dto/update-cotizacion.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Cotizacion } from './entities/cotizacion.entity';

@Controller('cotizacion')
@ApiTags('Cotizacion')
export class CotizacionController {
  constructor(private readonly cotizacionService: CotizacionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva cotización' })
  @ApiResponse({status: 201, description: 'Cotización creada exitosamente', type: Cotizacion})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createCotizacionDto: CreateCotizacionDto) {
    return this.cotizacionService.create(createCotizacionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las cotizaciones con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de cotizaciones obtenida exitosamente', type: [Cotizacion]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.cotizacionService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una cotización por ID' })
  @ApiParam({ name: 'id', description: 'ID de la cotización', example: 1 })
  @ApiResponse({status: 200, description: 'Cotización encontrada exitosamente', type: Cotizacion})
  @ApiResponse({status: 404, description: 'Cotización no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cotizacionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una cotización' })
  @ApiParam({ name: 'id', description: 'ID de la cotización', example: 1 })
  @ApiResponse({status: 200, description: 'Cotización actualizada exitosamente', type: Cotizacion})
  @ApiResponse({status: 404, description: 'Cotización no encontrada'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCotizacionDto: UpdateCotizacionDto) {
    return this.cotizacionService.update(id, updateCotizacionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una cotización' })
  @ApiParam({ name: 'id', description: 'ID de la cotización', example: 1 })
  @ApiResponse({status: 200, description: 'Cotización eliminada exitosamente'})
  @ApiResponse({status: 404, description: 'Cotización no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cotizacionService.remove(id);
  }
}
