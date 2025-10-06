import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { Factura } from './entities/factura.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Impuesto } from 'src/impuesto/entities/impuesto.entity';
import { Moneda } from 'src/moneda/entities/moneda.entity';
import { TipoPago } from 'src/tipo-pago/entities/tipo-pago.entity';
import { Bodega } from 'src/bodega/entities/bodega.entity';
import { ConsecutivoModule } from 'src/consecutivo/consecutivo.module';
import { Consecutivo } from 'src/consecutivo/entities/consecutivo.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Factura,
      Cliente,
      TipoPago,
      Moneda,
      Impuesto,
      Bodega,
      Consecutivo,
      Empleado,
    ]),
    ConsecutivoModule,
  ],
  controllers: [FacturaController],
  providers: [FacturaService],
})
export class FacturaModule {}
