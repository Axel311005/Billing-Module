import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Vehiculo } from './entities/vehiculo.entity';

@Controller('vehiculo')
@ApiTags('Vehiculo')
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo vehículo' })
  @ApiResponse({status: 201, description: 'Vehículo creado exitosamente', type: Vehiculo})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createVehiculoDto: CreateVehiculoDto) {
    return this.vehiculoService.create(createVehiculoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los vehículos con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de vehículos obtenida exitosamente', type: [Vehiculo]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.vehiculoService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un vehículo por ID' })
  @ApiParam({ name: 'id', description: 'ID del vehículo', example: 1 })
  @ApiResponse({status: 200, description: 'Vehículo encontrado exitosamente', type: Vehiculo})
  @ApiResponse({status: 404, description: 'Vehículo no encontrado'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehiculoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un vehículo' })
  @ApiParam({ name: 'id', description: 'ID del vehículo', example: 1 })
  @ApiResponse({status: 200, description: 'Vehículo actualizado exitosamente', type: Vehiculo})
  @ApiResponse({status: 404, description: 'Vehículo no encontrado'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateVehiculoDto: UpdateVehiculoDto) {
    return this.vehiculoService.update(id, updateVehiculoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un vehículo' })
  @ApiParam({ name: 'id', description: 'ID del vehículo', example: 1 })
  @ApiResponse({status: 200, description: 'Vehículo eliminado exitosamente'})
  @ApiResponse({status: 404, description: 'Vehículo no encontrado'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vehiculoService.remove(id);
  }
}
