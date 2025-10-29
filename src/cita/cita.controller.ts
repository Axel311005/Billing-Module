import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { CitaService } from './cita.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Cita } from './entities/cita.entity';

@Controller('cita')
@ApiTags('Cita')
export class CitaController {
  constructor(private readonly citaService: CitaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva cita' })
  @ApiResponse({status: 201, description: 'Cita creada exitosamente', type: Cita})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createCitaDto: CreateCitaDto) {
    return this.citaService.create(createCitaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las citas con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de citas obtenida exitosamente', type: [Cita]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.citaService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una cita por ID' })
  @ApiParam({ name: 'id', description: 'ID único de la cita', example: 'uuid-string' })
  @ApiResponse({status: 200, description: 'Cita encontrada exitosamente', type: Cita})
  @ApiResponse({status: 404, description: 'Cita no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.citaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una cita' })
  @ApiParam({ name: 'id', description: 'ID único de la cita', example: 'uuid-string' })
  @ApiResponse({status: 200, description: 'Cita actualizada exitosamente', type: Cita})
  @ApiResponse({status: 404, description: 'Cita no encontrada'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCitaDto: UpdateCitaDto) {
    return this.citaService.update(id, updateCitaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una cita' })
  @ApiParam({ name: 'id', description: 'ID único de la cita', example: 'uuid-string' })
  @ApiResponse({status: 200, description: 'Cita eliminada exitosamente'})
  @ApiResponse({status: 404, description: 'Cita no encontrada'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.citaService.remove(id);
  }
}





