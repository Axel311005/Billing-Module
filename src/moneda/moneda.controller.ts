import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { MonedaService } from './moneda.service';
import { CreateMonedaDto } from './dto/create-moneda.dto';
import { UpdateMonedaDto } from './dto/update-moneda.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Moneda } from './entities/moneda.entity';

@Controller('moneda')
@ApiTags('Moneda')
export class MonedaController {
  constructor(private readonly monedaService: MonedaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva moneda' })
  @ApiResponse({status: 201, description: 'Moneda creada exitosamente', type: Moneda})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createMonedaDto: CreateMonedaDto) {
    return this.monedaService.create(createMonedaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las monedas con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de monedas obtenida exitosamente', type: [Moneda]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.monedaService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una moneda por ID' })
  @ApiParam({ name: 'id', description: 'ID de la moneda', example: 1 })
  @ApiResponse({status: 200, description: 'Moneda encontrada exitosamente', type: Moneda})
  @ApiResponse({status: 404, description: 'Moneda no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.monedaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una moneda' })
  @ApiParam({ name: 'id', description: 'ID de la moneda', example: 1 })
  @ApiResponse({status: 200, description: 'Moneda actualizada exitosamente', type: Moneda})
  @ApiResponse({status: 404, description: 'Moneda no encontrada'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMonedaDto: UpdateMonedaDto) {
    return this.monedaService.update(id, updateMonedaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una moneda' })
  @ApiParam({ name: 'id', description: 'ID de la moneda', example: 1 })
  @ApiResponse({status: 200, description: 'Moneda eliminada exitosamente'})
  @ApiResponse({status: 404, description: 'Moneda no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.monedaService.remove(id);
  }
}
