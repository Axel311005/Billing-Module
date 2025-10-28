import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { MovimientoCajaService } from './movimiento-caja.service';
import { CreateMovimientoCajaDto } from './dto/create-movimiento-caja.dto';
import { UpdateMovimientoCajaDto } from './dto/update-movimiento-caja.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { MovimientoCaja } from './entities/movimiento-caja.entity';

@Controller('movimiento-caja')
@ApiTags('MovimientoCaja')
export class MovimientoCajaController {
  constructor(private readonly movimientoCajaService: MovimientoCajaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo movimiento de caja' })
  @ApiResponse({status: 201, description: 'Movimiento de caja creado exitosamente', type: MovimientoCaja})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createMovimientoCajaDto: CreateMovimientoCajaDto) {
    return this.movimientoCajaService.create(createMovimientoCajaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los movimientos de caja con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de movimientos de caja obtenida exitosamente', type: [MovimientoCaja]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.movimientoCajaService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un movimiento de caja por ID' })
  @ApiParam({ name: 'id', description: 'ID del movimiento de caja', example: 1 })
  @ApiResponse({status: 200, description: 'Movimiento de caja encontrado exitosamente', type: MovimientoCaja})
  @ApiResponse({status: 404, description: 'Movimiento de caja no encontrado'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movimientoCajaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un movimiento de caja' })
  @ApiParam({ name: 'id', description: 'ID del movimiento de caja', example: 1 })
  @ApiResponse({status: 200, description: 'Movimiento de caja actualizado exitosamente', type: MovimientoCaja})
  @ApiResponse({status: 404, description: 'Movimiento de caja no encontrado'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMovimientoCajaDto: UpdateMovimientoCajaDto) {
    return this.movimientoCajaService.update(id, updateMovimientoCajaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un movimiento de caja' })
  @ApiParam({ name: 'id', description: 'ID del movimiento de caja', example: 1 })
  @ApiResponse({status: 200, description: 'Movimiento de caja eliminado exitosamente'})
  @ApiResponse({status: 404, description: 'Movimiento de caja no encontrado'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movimientoCajaService.remove(id);
  }
}

