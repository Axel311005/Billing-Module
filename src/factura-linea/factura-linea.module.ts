import { Module } from '@nestjs/common';
import { FacturaLineaService } from './factura-linea.service';
import { FacturaLineaController } from './factura-linea.controller';
import { FacturaLinea } from './entities/factura-linea.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from 'src/factura/entities/factura.entity';
import { Item } from 'src/item/entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FacturaLinea, Factura, Item])],
  controllers: [FacturaLineaController],
  providers: [FacturaLineaService],
})
export class FacturaLineaModule {}
