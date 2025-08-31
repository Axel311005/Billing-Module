import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExistenciaBodegaService } from './existencia-bodega.service';
import { CreateExistenciaBodegaDto } from './dto/create-existencia-bodega.dto';
import { UpdateExistenciaBodegaDto } from './dto/update-existencia-bodega.dto';

@Controller('existencia-bodega')
export class ExistenciaBodegaController {
  constructor(private readonly existenciaBodegaService: ExistenciaBodegaService) {}

  @Post()
  create(@Body() createExistenciaBodegaDto: CreateExistenciaBodegaDto) {
    return this.existenciaBodegaService.create(createExistenciaBodegaDto);
  }

  @Get()
  findAll() {
    return this.existenciaBodegaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.existenciaBodegaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExistenciaBodegaDto: UpdateExistenciaBodegaDto) {
    return this.existenciaBodegaService.update(+id, updateExistenciaBodegaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.existenciaBodegaService.remove(+id);
  }
}
