import { Module } from '@nestjs/common';
import { CompraLineaService } from './compra-linea.service';
import { CompraLineaController } from './compra-linea.controller';
import { CompraLinea } from './entities/compra-linea.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compra } from 'src/compra/entities/compra.entity';
import { Item } from 'src/item/entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompraLinea, Compra, Item])],
  controllers: [CompraLineaController],
  providers: [CompraLineaService],
})
export class CompraLineaModule {}
