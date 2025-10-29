import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { MotivoCitaService } from './motivo-cita.service';
import { CreateMotivoCitaDto } from './dto/create-motivo-cita.dto';
import { UpdateMotivoCitaDto } from './dto/update-motivo-cita.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { MotivoCita } from './entities/motivo-cita.entity';

@Controller('motivo-cita')
@ApiTags('MotivoCita')
export class MotivoCitaController {
  constructor(private readonly motivoCitaService: MotivoCitaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo motivo de cita' })
  @ApiResponse({status: 201, description: 'Motivo de cita creado exitosamente', type: MotivoCita})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createMotivoCitaDto: CreateMotivoCitaDto) {
    return this.motivoCitaService.create(createMotivoCitaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los motivos de cita con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de motivos de cita obtenida exitosamente', type: [MotivoCita]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.motivoCitaService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un motivo de cita por ID' })
  @ApiParam({ name: 'id', description: 'ID del motivo de cita', example: 1 })
  @ApiResponse({status: 200, description: 'Motivo de cita encontrado exitosamente', type: MotivoCita})
  @ApiResponse({status: 404, description: 'Motivo de cita no encontrado'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.motivoCitaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un motivo de cita' })
  @ApiParam({ name: 'id', description: 'ID del motivo de cita', example: 1 })
  @ApiResponse({status: 200, description: 'Motivo de cita actualizado exitosamente', type: MotivoCita})
  @ApiResponse({status: 404, description: 'Motivo de cita no encontrado'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMotivoCitaDto: UpdateMotivoCitaDto) {
    return this.motivoCitaService.update(id, updateMotivoCitaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un motivo de cita' })
  @ApiParam({ name: 'id', description: 'ID del motivo de cita', example: 1 })
  @ApiResponse({status: 200, description: 'Motivo de cita eliminado exitosamente'})
  @ApiResponse({status: 404, description: 'Motivo de cita no encontrado'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.motivoCitaService.remove(id);
  }
}





