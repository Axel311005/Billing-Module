import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { UnidadMedidaService } from './unidad-medida.service';
import { CreateUnidadMedidaDto } from './dto/create-unidad-medida.dto';
import { UpdateUnidadMedidaDto } from './dto/update-unidad-medida.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { UnidadMedida } from './entities/unidad-medida.entity';

@Controller('unidad-medida')
@ApiTags('Unidad Medida')
export class UnidadMedidaController {
  constructor(private readonly unidadMedidaService: UnidadMedidaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva unidad de medida' })
  @ApiResponse({status: 201, description: 'Unidad de medida creada exitosamente', type: UnidadMedida})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createUnidadMedidaDto: CreateUnidadMedidaDto) {
    return this.unidadMedidaService.create(createUnidadMedidaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las unidades de medida con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de unidades de medida obtenida exitosamente', type: [UnidadMedida]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.unidadMedidaService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una unidad de medida por ID' })
  @ApiParam({ name: 'id', description: 'ID de la unidad de medida', example: 1 })
  @ApiResponse({status: 200, description: 'Unidad de medida encontrada exitosamente', type: UnidadMedida})
  @ApiResponse({status: 404, description: 'Unidad de medida no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.unidadMedidaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una unidad de medida' })
  @ApiParam({ name: 'id', description: 'ID de la unidad de medida', example: 1 })
  @ApiResponse({status: 200, description: 'Unidad de medida actualizada exitosamente', type: UnidadMedida})
  @ApiResponse({status: 404, description: 'Unidad de medida no encontrada'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUnidadMedidaDto: UpdateUnidadMedidaDto) {
    return this.unidadMedidaService.update(id, updateUnidadMedidaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una unidad de medida' })
  @ApiParam({ name: 'id', description: 'ID de la unidad de medida', example: 1 })
  @ApiResponse({status: 200, description: 'Unidad de medida eliminada exitosamente'})
  @ApiResponse({status: 404, description: 'Unidad de medida no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.unidadMedidaService.remove(id);
  }
}
