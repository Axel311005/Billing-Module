import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ExistenciaBodegaService } from './existencia-bodega.service';
import { CreateExistenciaBodegaDto } from './dto/create-existencia-bodega.dto';
import { UpdateExistenciaBodegaDto } from './dto/update-existencia-bodega.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ExistenciaBodega } from './entities/existencia-bodega.entity';

@Controller('existencia-bodega')
@ApiTags('Existencia Bodega')
export class ExistenciaBodegaController {
  constructor(private readonly existenciaBodegaService: ExistenciaBodegaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva existencia de bodega' })
  @ApiResponse({status: 201, description: 'Existencia de bodega creada exitosamente', type: ExistenciaBodega})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createExistenciaBodegaDto: CreateExistenciaBodegaDto) {
    return this.existenciaBodegaService.create(createExistenciaBodegaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las existencias de bodega con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de existencias de bodega obtenida exitosamente', type: [ExistenciaBodega]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.existenciaBodegaService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una existencia de bodega por ID' })
  @ApiParam({ name: 'id', description: 'ID de la existencia de bodega', example: 1 })
  @ApiResponse({status: 200, description: 'Existencia de bodega encontrada exitosamente', type: ExistenciaBodega})
  @ApiResponse({status: 404, description: 'Existencia de bodega no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.existenciaBodegaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una existencia de bodega' })
  @ApiParam({ name: 'id', description: 'ID de la existencia de bodega', example: 1 })
  @ApiResponse({status: 200, description: 'Existencia de bodega actualizada exitosamente', type: ExistenciaBodega})
  @ApiResponse({status: 404, description: 'Existencia de bodega no encontrada'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExistenciaBodegaDto: UpdateExistenciaBodegaDto) {
    return this.existenciaBodegaService.update(id, updateExistenciaBodegaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una existencia de bodega' })
  @ApiParam({ name: 'id', description: 'ID de la existencia de bodega', example: 1 })
  @ApiResponse({status: 200, description: 'Existencia de bodega eliminada exitosamente'})
  @ApiResponse({status: 404, description: 'Existencia de bodega no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.existenciaBodegaService.remove(id);
  }
}
