import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompraLineaService } from './compra-linea.service';
import { CreateCompraLineaDto } from './dto/create-compra-linea.dto';
import { UpdateCompraLineaDto } from './dto/update-compra-linea.dto';

@Controller('compra-linea')
export class CompraLineaController {
  constructor(private readonly compraLineaService: CompraLineaService) {}

  @Post()
  create(@Body() createCompraLineaDto: CreateCompraLineaDto) {
    return this.compraLineaService.create(createCompraLineaDto);
  }

  @Get()
  findAll() {
    return this.compraLineaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compraLineaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompraLineaDto: UpdateCompraLineaDto) {
    return this.compraLineaService.update(+id, updateCompraLineaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compraLineaService.remove(+id);
  }
}
