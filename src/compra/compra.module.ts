import { Module } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraController } from './compra.controller';
import { Compra } from './entities/compra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Impuesto } from 'src/impuesto/entities/impuesto.entity';
import { Moneda } from 'src/moneda/entities/moneda.entity';
import { TipoPago } from 'src/tipo-pago/entities/tipo-pago.entity';
import { Bodega } from 'src/bodega/entities/bodega.entity';
import { Consecutivo } from 'src/consecutivo/entities/consecutivo.entity';
import { ConsecutivoModule } from 'src/consecutivo/consecutivo.module';
import { Empleado } from 'src/empleado/entities/empleado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Compra,
      Moneda,
      TipoPago,
      Impuesto,
      Bodega,
      Consecutivo,
      Empleado,
    ]),
    ConsecutivoModule,
  ],
  controllers: [CompraController],
  providers: [CompraService],
})
export class CompraModule {}
