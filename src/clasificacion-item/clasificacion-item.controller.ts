import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ClasificacionItemService } from './clasificacion-item.service';
import { CreateClasificacionItemDto } from './dto/create-clasificacion-item.dto';
import { UpdateClasificacionItemDto } from './dto/update-clasificacion-item.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('clasificacion-item')
export class ClasificacionItemController {
  constructor(private readonly clasificacionItemService: ClasificacionItemService) {}

  @Post()
  create(@Body() createClasificacionItemDto: CreateClasificacionItemDto) {
    return this.clasificacionItemService.create(createClasificacionItemDto);
  }

  @Get()
  findAll(@Query() paginationDto : PaginationDto) {
    return this.clasificacionItemService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clasificacionItemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateClasificacionItemDto: UpdateClasificacionItemDto) {
    return this.clasificacionItemService.update(id, updateClasificacionItemDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clasificacionItemService.remove(id);
  }
}
