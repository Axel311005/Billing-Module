import { Module } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraController } from './compra.controller';
import { Compra } from './entities/compra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Impuesto } from 'src/impuesto/entities/impuesto.entity';
import { Moneda } from 'src/moneda/entities/moneda.entity';
import { TipoPago } from 'src/tipo-pago/entities/tipo-pago.entity';
import { Bodega } from 'src/bodega/entities/bodega.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compra, Moneda, TipoPago, Impuesto, Bodega])],
  controllers: [CompraController],
  providers: [CompraService],
})
export class CompraModule {}
