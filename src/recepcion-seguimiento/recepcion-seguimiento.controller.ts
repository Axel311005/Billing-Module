import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { RecepcionSeguimientoService } from './recepcion-seguimiento.service';
import { CreateRecepcionSeguimientoDto } from './dto/create-recepcion-seguimiento.dto';
import { UpdateRecepcionSeguimientoDto } from './dto/update-recepcion-seguimiento.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { RecepcionSeguimiento } from './entities/recepcion-seguimiento.entity';

@Controller('recepcion-seguimiento')
@ApiTags('RecepcionSeguimiento')
export class RecepcionSeguimientoController {
  constructor(private readonly recepcionSeguimientoService: RecepcionSeguimientoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo seguimiento de recepción' })
  @ApiResponse({status: 201, description: 'Seguimiento de recepción creado exitosamente', type: RecepcionSeguimiento})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createRecepcionSeguimientoDto: CreateRecepcionSeguimientoDto) {
    return this.recepcionSeguimientoService.create(createRecepcionSeguimientoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los seguimientos de recepción con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de seguimientos de recepción obtenida exitosamente', type: [RecepcionSeguimiento]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.recepcionSeguimientoService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un seguimiento de recepción por ID' })
  @ApiParam({ name: 'id', description: 'ID del seguimiento de recepción', example: 1 })
  @ApiResponse({status: 200, description: 'Seguimiento de recepción encontrado exitosamente', type: RecepcionSeguimiento})
  @ApiResponse({status: 404, description: 'Seguimiento de recepción no encontrado'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recepcionSeguimientoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un seguimiento de recepción' })
  @ApiParam({ name: 'id', description: 'ID del seguimiento de recepción', example: 1 })
  @ApiResponse({status: 200, description: 'Seguimiento de recepción actualizado exitosamente', type: RecepcionSeguimiento})
  @ApiResponse({status: 404, description: 'Seguimiento de recepción no encontrado'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRecepcionSeguimientoDto: UpdateRecepcionSeguimientoDto) {
    return this.recepcionSeguimientoService.update(id, updateRecepcionSeguimientoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un seguimiento de recepción' })
  @ApiParam({ name: 'id', description: 'ID del seguimiento de recepción', example: 1 })
  @ApiResponse({status: 200, description: 'Seguimiento de recepción eliminado exitosamente'})
  @ApiResponse({status: 404, description: 'Seguimiento de recepción no encontrado'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recepcionSeguimientoService.remove(id);
  }
}




