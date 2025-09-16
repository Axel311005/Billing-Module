import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ConsecutivoService } from './consecutivo.service';
import { CreateConsecutivoDto } from './dto/create-consecutivo.dto';
import { UpdateConsecutivoDto } from './dto/update-consecutivo.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('consecutivo')
export class ConsecutivoController {
  constructor(private readonly consecutivoService: ConsecutivoService) {}

  @Post()
  create(@Body() createConsecutivoDto: CreateConsecutivoDto) {
    return this.consecutivoService.create(createConsecutivoDto);
  }

  @Get()
  findAll(@Query() paginationDto : PaginationDto) {
    return this.consecutivoService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consecutivoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsecutivoDto: UpdateConsecutivoDto) {
    return this.consecutivoService.update(+id, updateConsecutivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consecutivoService.remove(+id);
  }
}
