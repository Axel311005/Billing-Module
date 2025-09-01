import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { TipoPagoService } from './tipo-pago.service';
import { CreateTipoPagoDto } from './dto/create-tipo-pago.dto';
import { UpdateTipoPagoDto } from './dto/update-tipo-pago.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TipoPago } from './entities/tipo-pago.entity';

@Controller('tipo-pago')
@ApiTags('Tipo Pago')
export class TipoPagoController {
  constructor(private readonly tipoPagoService: TipoPagoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo tipo de pago' })
  @ApiResponse({status: 201, description: 'Tipo de pago creado exitosamente', type: TipoPago})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  create(@Body() createTipoPagoDto: CreateTipoPagoDto) {
    return this.tipoPagoService.create(createTipoPagoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los tipos de pago con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a saltar', example: 0 })
  @ApiResponse({status: 200, description: 'Lista de tipos de pago obtenida exitosamente', type: [TipoPago]})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findAll(@Query() paginationDto : PaginationDto) {
    return this.tipoPagoService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un tipo de pago por ID' })
  @ApiParam({ name: 'id', description: 'ID del tipo de pago', example: 1 })
  @ApiResponse({status: 200, description: 'Tipo de pago encontrado exitosamente', type: TipoPago})
  @ApiResponse({status: 404, description: 'Tipo de pago no encontrado'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tipoPagoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un tipo de pago' })
  @ApiParam({ name: 'id', description: 'ID del tipo de pago', example: 1 })
  @ApiResponse({status: 200, description: 'Tipo de pago actualizado exitosamente', type: TipoPago})
  @ApiResponse({status: 404, description: 'Tipo de pago no encontrado'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTipoPagoDto: UpdateTipoPagoDto) {
    return this.tipoPagoService.update(id, updateTipoPagoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un tipo de pago' })
  @ApiParam({ name: 'id', description: 'ID del tipo de pago', example: 1 })
  @ApiResponse({status: 200, description: 'Tipo de pago eliminado exitosamente'})
  @ApiResponse({status: 404, description: 'Tipo de pago no encontrado'})
  @ApiResponse({status: 403, description: 'Forbidden, Token is not valid or expired'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tipoPagoService.remove(id);
  }
}
