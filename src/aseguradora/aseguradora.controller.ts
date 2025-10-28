import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { AseguradoraService } from './aseguradora.service';
import { CreateAseguradoraDto } from './dto/create-aseguradora.dto';
import { UpdateAseguradoraDto } from './dto/update-aseguradora.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Aseguradora } from './entities/aseguradora.entity';

@Controller('aseguradora')
@ApiTags('Aseguradora')
export class AseguradoraController {
  constructor(private readonly aseguradoraService: AseguradoraService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva aseguradora' })
  @ApiResponse({status: 201, description: 'Aseguradora creada exitosamente', type: Aseguradora})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createAseguradoraDto: CreateAseguradoraDto) {
    return this.aseguradoraService.create(createAseguradoraDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las aseguradoras con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de aseguradoras obtenida exitosamente', type: [Aseguradora]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.aseguradoraService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una aseguradora por ID' })
  @ApiParam({ name: 'id', description: 'ID de la aseguradora', example: 1 })
  @ApiResponse({status: 200, description: 'Aseguradora encontrada exitosamente', type: Aseguradora})
  @ApiResponse({status: 404, description: 'Aseguradora no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.aseguradoraService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una aseguradora' })
  @ApiParam({ name: 'id', description: 'ID de la aseguradora', example: 1 })
  @ApiResponse({status: 200, description: 'Aseguradora actualizada exitosamente', type: Aseguradora})
  @ApiResponse({status: 404, description: 'Aseguradora no encontrada'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAseguradoraDto: UpdateAseguradoraDto) {
    return this.aseguradoraService.update(id, updateAseguradoraDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una aseguradora' })
  @ApiParam({ name: 'id', description: 'ID de la aseguradora', example: 1 })
  @ApiResponse({status: 200, description: 'Aseguradora eliminada exitosamente'})
  @ApiResponse({status: 404, description: 'Aseguradora no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.aseguradoraService.remove(id);
  }
}




