import { Injectable } from '@nestjs/common';
import { CreateUnidadMedidaDto } from './dto/create-unidad-medida.dto';
import { UpdateUnidadMedidaDto } from './dto/update-unidad-medida.dto';

@Injectable()
export class UnidadMedidaService {
  create(createUnidadMedidaDto: CreateUnidadMedidaDto) {
    return 'This action adds a new unidadMedida';
  }

  findAll() {
    return `This action returns all unidadMedida`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unidadMedida`;
  }

  update(id: number, updateUnidadMedidaDto: UpdateUnidadMedidaDto) {
    return `This action updates a #${id} unidadMedida`;
  }

  remove(id: number) {
    return `This action removes a #${id} unidadMedida`;
  }
}
