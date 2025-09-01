import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ImpuestoService } from './impuesto.service';
import { CreateImpuestoDto } from './dto/create-impuesto.dto';
import { UpdateImpuestoDto } from './dto/update-impuesto.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Impuesto } from './entities/impuesto.entity';

@Controller('impuesto')
@ApiTags('Impuesto')
export class ImpuestoController {
  constructor(private readonly impuestoService: ImpuestoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo impuesto' })
  @ApiResponse({status: 201, description: 'Impuesto creado exitosamente', type: Impuesto})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createImpuestoDto: CreateImpuestoDto) {
    return this.impuestoService.create(createImpuestoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los impuestos con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de impuestos obtenida exitosamente', type: [Impuesto]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.impuestoService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un impuesto por ID' })
  @ApiParam({ name: 'id', description: 'ID del impuesto', example: 1 })
  @ApiResponse({status: 200, description: 'Impuesto encontrado exitosamente', type: Impuesto})
  @ApiResponse({status: 404, description: 'Impuesto no encontrado'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.impuestoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un impuesto' })
  @ApiParam({ name: 'id', description: 'ID del impuesto', example: 1 })
  @ApiResponse({status: 200, description: 'Impuesto actualizado exitosamente', type: Impuesto})
  @ApiResponse({status: 404, description: 'Impuesto no encontrado'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateImpuestoDto: UpdateImpuestoDto) {
    return this.impuestoService.update(id, updateImpuestoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un impuesto' })
  @ApiParam({ name: 'id', description: 'ID del impuesto', example: 1 })
  @ApiResponse({status: 200, description: 'Impuesto eliminado exitosamente'})
  @ApiResponse({status: 404, description: 'Impuesto no encontrado'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.impuestoService.remove(id);
  }
}
