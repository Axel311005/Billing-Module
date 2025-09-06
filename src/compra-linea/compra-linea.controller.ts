import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { CompraLineaService } from './compra-linea.service';
import { CreateCompraLineaDto } from './dto/create-compra-linea.dto';
import { UpdateCompraLineaDto } from './dto/update-compra-linea.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CompraLinea } from './entities/compra-linea.entity';

@Controller('compra-linea')
@ApiTags('Compra Linea')
export class CompraLineaController {
  constructor(private readonly compraLineaService: CompraLineaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva línea de compra' })
  @ApiResponse({status: 201, description: 'Línea de compra creada exitosamente', type: CompraLinea})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createCompraLineaDto: CreateCompraLineaDto) {
    return this.compraLineaService.create(createCompraLineaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las líneas de compra con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de líneas de compra obtenida exitosamente', type: [CompraLinea]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.compraLineaService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una línea de compra por ID' })
  @ApiParam({ name: 'id', description: 'ID de la línea de compra', example: 1 })
  @ApiResponse({status: 200, description: 'Línea de compra encontrada exitosamente', type: CompraLinea})
  @ApiResponse({status: 404, description: 'Línea de compra no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.compraLineaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una línea de compra' })
  @ApiParam({ name: 'id', description: 'ID de la línea de compra', example: 1 })
  @ApiResponse({status: 200, description: 'Línea de compra actualizada exitosamente', type: CompraLinea})
  @ApiResponse({status: 404, description: 'Línea de compra no encontrada'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCompraLineaDto: UpdateCompraLineaDto) {
    return this.compraLineaService.update(id, updateCompraLineaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una línea de compra' })
  @ApiParam({ name: 'id', description: 'ID de la línea de compra', example: 1 })
  @ApiResponse({status: 200, description: 'Línea de compra eliminada exitosamente'})
  @ApiResponse({status: 404, description: 'Línea de compra no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.compraLineaService.remove(id);
  }
}
