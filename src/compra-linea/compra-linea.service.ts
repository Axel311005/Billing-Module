import { Injectable } from '@nestjs/common';
import { CreateCompraLineaDto } from './dto/create-compra-linea.dto';
import { UpdateCompraLineaDto } from './dto/update-compra-linea.dto';

@Injectable()
export class CompraLineaService {
  create(createCompraLineaDto: CreateCompraLineaDto) {
    return 'This action adds a new compraLinea';
  }

  findAll() {
    return `This action returns all compraLinea`;
  }

  findOne(id: number) {
    return `This action returns a #${id} compraLinea`;
  }

  update(id: number, updateCompraLineaDto: UpdateCompraLineaDto) {
    return `This action updates a #${id} compraLinea`;
  }

  remove(id: number) {
    return `This action removes a #${id} compraLinea`;
  }
}
