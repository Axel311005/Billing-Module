import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { BodegaService } from './bodega.service';
import { CreateBodegaDto } from './dto/create-bodega.dto';
import { UpdateBodegaDto } from './dto/update-bodega.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Bodega } from './entities/bodega.entity';

@Controller('bodega')
@ApiTags('Bodega')
export class BodegaController {
  constructor(private readonly bodegaService: BodegaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva bodega' })
  @ApiResponse({status: 201, description: 'Bodega creada exitosamente', type: Bodega})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createBodegaDto: CreateBodegaDto) {
    return this.bodegaService.create(createBodegaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las bodegas con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de bodegas obtenida exitosamente', type: [Bodega]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.bodegaService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una bodega por ID' })
  @ApiParam({ name: 'id', description: 'ID de la bodega', example: 1 })
  @ApiResponse({status: 200, description: 'Bodega encontrada exitosamente', type: Bodega})
  @ApiResponse({status: 404, description: 'Bodega no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bodegaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una bodega' })
  @ApiParam({ name: 'id', description: 'ID de la bodega', example: 1 })
  @ApiResponse({status: 200, description: 'Bodega actualizada exitosamente', type: Bodega})
  @ApiResponse({status: 404, description: 'Bodega no encontrada'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBodegaDto: UpdateBodegaDto) {
    return this.bodegaService.update(id, updateBodegaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una bodega' })
  @ApiParam({ name: 'id', description: 'ID de la bodega', example: 1 })
  @ApiResponse({status: 200, description: 'Bodega eliminada exitosamente'})
  @ApiResponse({status: 404, description: 'Bodega no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bodegaService.remove(id);
  }
}
