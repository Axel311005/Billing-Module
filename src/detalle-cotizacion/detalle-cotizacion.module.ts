import { Module } from '@nestjs/common';
import { DetalleCotizacionService } from './detalle-cotizacion.service';
import { DetalleCotizacionController } from './detalle-cotizacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleCotizacion } from './entities/detalle-cotizacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleCotizacion])],
  controllers: [DetalleCotizacionController],
  providers: [DetalleCotizacionService],
})
export class DetalleCotizacionModule {}
