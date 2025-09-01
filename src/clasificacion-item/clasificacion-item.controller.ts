import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ClasificacionItemService } from './clasificacion-item.service';
import { CreateClasificacionItemDto } from './dto/create-clasificacion-item.dto';
import { UpdateClasificacionItemDto } from './dto/update-clasificacion-item.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ClasificacionItem } from './entities/clasificacion-item.entity';

@Controller('clasificacion-item')
@ApiTags('Clasificacion Item')
export class ClasificacionItemController {
  constructor(private readonly clasificacionItemService: ClasificacionItemService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva clasificación de item' })
  @ApiResponse({status: 201, description: 'Clasificacion Item created successfully', type: ClasificacionItem})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createClasificacionItemDto: CreateClasificacionItemDto) {
    return this.clasificacionItemService.create(createClasificacionItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las clasificaciones de items con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de clasificaciones obtenida exitosamente', type: [ClasificacionItem]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.clasificacionItemService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una clasificación de item por ID' })
  @ApiParam({ name: 'id', description: 'ID de la clasificación', example: 1 })
  @ApiResponse({status: 200, description: 'Clasificación encontrada exitosamente', type: ClasificacionItem})
  @ApiResponse({status: 404, description: 'Clasificación no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clasificacionItemService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una clasificación de item' })
  @ApiParam({ name: 'id', description: 'ID de la clasificación', example: 1 })
  @ApiResponse({status: 200, description: 'Clasificación actualizada exitosamente', type: ClasificacionItem})
  @ApiResponse({status: 404, description: 'Clasificación no encontrada'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateClasificacionItemDto: UpdateClasificacionItemDto) {
    return this.clasificacionItemService.update(id, updateClasificacionItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una clasificación de item' })
  @ApiParam({ name: 'id', description: 'ID de la clasificación', example: 1 })
  @ApiResponse({status: 200, description: 'Clasificación eliminada exitosamente'})
  @ApiResponse({status: 404, description: 'Clasificación no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clasificacionItemService.remove(id);
  }
}
