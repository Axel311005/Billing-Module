import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImpuestoService } from './impuesto.service';
import { CreateImpuestoDto } from './dto/create-impuesto.dto';
import { UpdateImpuestoDto } from './dto/update-impuesto.dto';

@Controller('impuesto')
export class ImpuestoController {
  constructor(private readonly impuestoService: ImpuestoService) {}

  @Post()
  create(@Body() createImpuestoDto: CreateImpuestoDto) {
    return this.impuestoService.create(createImpuestoDto);
  }

  @Get()
  findAll() {
    return this.impuestoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.impuestoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImpuestoDto: UpdateImpuestoDto) {
    return this.impuestoService.update(+id, updateImpuestoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.impuestoService.remove(+id);
  }
}
