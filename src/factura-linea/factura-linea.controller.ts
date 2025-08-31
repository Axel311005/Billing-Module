import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacturaLineaService } from './factura-linea.service';
import { CreateFacturaLineaDto } from './dto/create-factura-linea.dto';
import { UpdateFacturaLineaDto } from './dto/update-factura-linea.dto';

@Controller('factura-linea')
export class FacturaLineaController {
  constructor(private readonly facturaLineaService: FacturaLineaService) {}

  @Post()
  create(@Body() createFacturaLineaDto: CreateFacturaLineaDto) {
    return this.facturaLineaService.create(createFacturaLineaDto);
  }

  @Get()
  findAll() {
    return this.facturaLineaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facturaLineaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacturaLineaDto: UpdateFacturaLineaDto) {
    return this.facturaLineaService.update(+id, updateFacturaLineaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facturaLineaService.remove(+id);
  }
}
