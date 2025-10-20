import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { RecepcionService } from './recepcion.service';
import { CreateRecepcionDto } from './dto/create-recepcion.dto';
import { UpdateRecepcionDto } from './dto/update-recepcion.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Recepcion } from './entities/recepcion.entity';

@Controller('recepcion')
@ApiTags('Recepcion')
export class RecepcionController {
  constructor(private readonly recepcionService: RecepcionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva recepción' })
  @ApiResponse({status: 201, description: 'Recepción creada exitosamente', type: Recepcion})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createRecepcionDto: CreateRecepcionDto) {
    return this.recepcionService.create(createRecepcionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las recepciones con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de recepciones obtenida exitosamente', type: [Recepcion]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.recepcionService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una recepción por ID' })
  @ApiParam({ name: 'id', description: 'ID de la recepción', example: 1 })
  @ApiResponse({status: 200, description: 'Recepción encontrada exitosamente', type: Recepcion})
  @ApiResponse({status: 404, description: 'Recepción no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recepcionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una recepción' })
  @ApiParam({ name: 'id', description: 'ID de la recepción', example: 1 })
  @ApiResponse({status: 200, description: 'Recepción actualizada exitosamente', type: Recepcion})
  @ApiResponse({status: 404, description: 'Recepción no encontrada'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRecepcionDto: UpdateRecepcionDto) {
    return this.recepcionService.update(id, updateRecepcionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una recepción' })
  @ApiParam({ name: 'id', description: 'ID de la recepción', example: 1 })
  @ApiResponse({status: 200, description: 'Recepción eliminada exitosamente'})
  @ApiResponse({status: 404, description: 'Recepción no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recepcionService.remove(id);
  }
}
