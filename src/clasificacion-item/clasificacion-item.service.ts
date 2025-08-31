import { Injectable } from '@nestjs/common';
import { CreateClasificacionItemDto } from './dto/create-clasificacion-item.dto';
import { UpdateClasificacionItemDto } from './dto/update-clasificacion-item.dto';

@Injectable()
export class ClasificacionItemService {
  create(createClasificacionItemDto: CreateClasificacionItemDto) {
    return 'This action adds a new clasificacionItem';
  }

  findAll() {
    return `This action returns all clasificacionItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clasificacionItem`;
  }

  update(id: number, updateClasificacionItemDto: UpdateClasificacionItemDto) {
    return `This action updates a #${id} clasificacionItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} clasificacionItem`;
  }
}
