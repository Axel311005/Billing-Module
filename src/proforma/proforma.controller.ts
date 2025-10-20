import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ProformaService } from './proforma.service';
import { CreateProformaDto } from './dto/create-proforma.dto';
import { UpdateProformaDto } from './dto/update-proforma.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Proforma } from './entities/proforma.entity';

@Controller('proforma')
@ApiTags('Proforma')
export class ProformaController {
  constructor(private readonly proformaService: ProformaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva proforma' })
  @ApiResponse({status: 201, description: 'Proforma creada exitosamente', type: Proforma})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createProformaDto: CreateProformaDto) {
    return this.proformaService.create(createProformaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las proformas con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de proformas obtenida exitosamente', type: [Proforma]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.proformaService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una proforma por ID' })
  @ApiParam({ name: 'id', description: 'ID de la proforma', example: 1 })
  @ApiResponse({status: 200, description: 'Proforma encontrada exitosamente', type: Proforma})
  @ApiResponse({status: 404, description: 'Proforma no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.proformaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una proforma' })
  @ApiParam({ name: 'id', description: 'ID de la proforma', example: 1 })
  @ApiResponse({status: 200, description: 'Proforma actualizada exitosamente', type: Proforma})
  @ApiResponse({status: 404, description: 'Proforma no encontrada'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProformaDto: UpdateProformaDto) {
    return this.proformaService.update(id, updateProformaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una proforma' })
  @ApiParam({ name: 'id', description: 'ID de la proforma', example: 1 })
  @ApiResponse({status: 200, description: 'Proforma eliminada exitosamente'})
  @ApiResponse({status: 404, description: 'Proforma no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.proformaService.remove(id);
  }
}
