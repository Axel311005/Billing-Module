import { Injectable } from '@nestjs/common';
import { CreateMonedaDto } from './dto/create-moneda.dto';
import { UpdateMonedaDto } from './dto/update-moneda.dto';

@Injectable()
export class MonedaService {
  create(createMonedaDto: CreateMonedaDto) {
    return 'This action adds a new moneda';
  }

  findAll() {
    return `This action returns all moneda`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moneda`;
  }

  update(id: number, updateMonedaDto: UpdateMonedaDto) {
    return `This action updates a #${id} moneda`;
  }

  remove(id: number) {
    return `This action removes a #${id} moneda`;
  }
}
