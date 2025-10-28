import { Module } from '@nestjs/common';
import { CotizacionService } from './cotizacion.service';
import { CotizacionController } from './cotizacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cotizacion } from './entities/cotizacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cotizacion])],
  controllers: [CotizacionController],
  providers: [CotizacionService],
})
export class CotizacionModule {}




