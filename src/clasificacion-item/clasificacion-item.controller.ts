import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClasificacionItemService } from './clasificacion-item.service';
import { CreateClasificacionItemDto } from './dto/create-clasificacion-item.dto';
import { UpdateClasificacionItemDto } from './dto/update-clasificacion-item.dto';

@Controller('clasificacion-item')
export class ClasificacionItemController {
  constructor(private readonly clasificacionItemService: ClasificacionItemService) {}

  @Post()
  create(@Body() createClasificacionItemDto: CreateClasificacionItemDto) {
    return this.clasificacionItemService.create(createClasificacionItemDto);
  }

  @Get()
  findAll() {
    return this.clasificacionItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clasificacionItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClasificacionItemDto: UpdateClasificacionItemDto) {
    return this.clasificacionItemService.update(+id, updateClasificacionItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clasificacionItemService.remove(+id);
  }
}
