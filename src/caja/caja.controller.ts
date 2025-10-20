import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { CajaService } from './caja.service';
import { CreateCajaDto } from './dto/create-caja.dto';
import { UpdateCajaDto } from './dto/update-caja.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Caja } from './entities/caja.entity';

@Controller('caja')
@ApiTags('Caja')
export class CajaController {
  constructor(private readonly cajaService: CajaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva caja' })
  @ApiResponse({status: 201, description: 'Caja creada exitosamente', type: Caja})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createCajaDto: CreateCajaDto) {
    return this.cajaService.create(createCajaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las cajas con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de cajas obtenida exitosamente', type: [Caja]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.cajaService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una caja por ID' })
  @ApiParam({ name: 'id', description: 'ID de la caja', example: 1 })
  @ApiResponse({status: 200, description: 'Caja encontrada exitosamente', type: Caja})
  @ApiResponse({status: 404, description: 'Caja no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cajaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una caja' })
  @ApiParam({ name: 'id', description: 'ID de la caja', example: 1 })
  @ApiResponse({status: 200, description: 'Caja actualizada exitosamente', type: Caja})
  @ApiResponse({status: 404, description: 'Caja no encontrada'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCajaDto: UpdateCajaDto) {
    return this.cajaService.update(id, updateCajaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una caja' })
  @ApiParam({ name: 'id', description: 'ID de la caja', example: 1 })
  @ApiResponse({status: 200, description: 'Caja eliminada exitosamente'})
  @ApiResponse({status: 404, description: 'Caja no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cajaService.remove(id);
  }
}
