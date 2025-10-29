import { Module } from '@nestjs/common';
import { CotizacionService } from './cotizacion.service';
import { CotizacionController } from './cotizacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cotizacion } from './entities/cotizacion.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Consecutivo } from 'src/consecutivo/entities/consecutivo.entity';
import { ConsecutivoModule } from 'src/consecutivo/consecutivo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cotizacion, Cliente, Consecutivo]),
    ConsecutivoModule,
  ],
  controllers: [CotizacionController],
  providers: [CotizacionService],
})
export class CotizacionModule {}
