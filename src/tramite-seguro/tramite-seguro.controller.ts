import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { TramiteSeguroService } from './tramite-seguro.service';
import { CreateTramiteSeguroDto } from './dto/create-tramite-seguro.dto';
import { UpdateTramiteSeguroDto } from './dto/update-tramite-seguro.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TramiteSeguro } from './entities/tramite-seguro.entity';

@Controller('tramite-seguro')
@ApiTags('TramiteSeguro')
export class TramiteSeguroController {
  constructor(private readonly tramiteSeguroService: TramiteSeguroService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo trámite de seguro' })
  @ApiResponse({status: 201, description: 'Trámite de seguro creado exitosamente', type: TramiteSeguro})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createTramiteSeguroDto: CreateTramiteSeguroDto) {
    return this.tramiteSeguroService.create(createTramiteSeguroDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los trámites de seguro con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de trámites de seguro obtenida exitosamente', type: [TramiteSeguro]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.tramiteSeguroService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un trámite de seguro por ID' })
  @ApiParam({ name: 'id', description: 'ID del trámite de seguro', example: 1 })
  @ApiResponse({status: 200, description: 'Trámite de seguro encontrado exitosamente', type: TramiteSeguro})
  @ApiResponse({status: 404, description: 'Trámite de seguro no encontrado'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tramiteSeguroService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un trámite de seguro' })
  @ApiParam({ name: 'id', description: 'ID del trámite de seguro', example: 1 })
  @ApiResponse({status: 200, description: 'Trámite de seguro actualizado exitosamente', type: TramiteSeguro})
  @ApiResponse({status: 404, description: 'Trámite de seguro no encontrado'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTramiteSeguroDto: UpdateTramiteSeguroDto) {
    return this.tramiteSeguroService.update(id, updateTramiteSeguroDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un trámite de seguro' })
  @ApiParam({ name: 'id', description: 'ID del trámite de seguro', example: 1 })
  @ApiResponse({status: 200, description: 'Trámite de seguro eliminado exitosamente'})
  @ApiResponse({status: 404, description: 'Trámite de seguro no encontrado'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tramiteSeguroService.remove(id);
  }
}
