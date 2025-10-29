import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ProformaLineasService } from './proforma-lineas.service';
import { CreateProformaLineasDto } from './dto/create-proforma-lineas.dto';
import { UpdateProformaLineasDto } from './dto/update-proforma-lineas.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ProformaLineas } from './entities/proforma-lineas.entity';

@Controller('proforma-lineas')
@ApiTags('ProformaLineas')
export class ProformaLineasController {
  constructor(private readonly proformaLineasService: ProformaLineasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva línea de proforma' })
  @ApiResponse({status: 201, description: 'Línea de proforma creada exitosamente', type: ProformaLineas})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createProformaLineasDto: CreateProformaLineasDto) {
    return this.proformaLineasService.create(createProformaLineasDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las líneas de proforma con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de líneas de proforma obtenida exitosamente', type: [ProformaLineas]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.proformaLineasService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una línea de proforma por ID' })
  @ApiParam({ name: 'id', description: 'ID de la línea de proforma', example: 1 })
  @ApiResponse({status: 200, description: 'Línea de proforma encontrada exitosamente', type: ProformaLineas})
  @ApiResponse({status: 404, description: 'Línea de proforma no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.proformaLineasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una línea de proforma' })
  @ApiParam({ name: 'id', description: 'ID de la línea de proforma', example: 1 })
  @ApiResponse({status: 200, description: 'Línea de proforma actualizada exitosamente', type: ProformaLineas})
  @ApiResponse({status: 404, description: 'Línea de proforma no encontrada'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProformaLineasDto: UpdateProformaLineasDto) {
    return this.proformaLineasService.update(id, updateProformaLineasDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una línea de proforma' })
  @ApiParam({ name: 'id', description: 'ID de la línea de proforma', example: 1 })
  @ApiResponse({status: 200, description: 'Línea de proforma eliminada exitosamente'})
  @ApiResponse({status: 404, description: 'Línea de proforma no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.proformaLineasService.remove(id);
  }
}





