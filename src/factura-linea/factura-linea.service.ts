import { Injectable } from '@nestjs/common';
import { CreateFacturaLineaDto } from './dto/create-factura-linea.dto';
import { UpdateFacturaLineaDto } from './dto/update-factura-linea.dto';

@Injectable()
export class FacturaLineaService {
  create(createFacturaLineaDto: CreateFacturaLineaDto) {
    return 'This action adds a new facturaLinea';
  }

  findAll() {
    return `This action returns all facturaLinea`;
  }

  findOne(id: number) {
    return `This action returns a #${id} facturaLinea`;
  }

  update(id: number, updateFacturaLineaDto: UpdateFacturaLineaDto) {
    return `This action updates a #${id} facturaLinea`;
  }

  remove(id: number) {
    return `This action removes a #${id} facturaLinea`;
  }
}
