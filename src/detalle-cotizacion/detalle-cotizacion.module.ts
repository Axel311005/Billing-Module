import { Module } from '@nestjs/common';
import { DetalleCotizacionService } from './detalle-cotizacion.service';
import { DetalleCotizacionController } from './detalle-cotizacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleCotizacion } from './entities/detalle-cotizacion.entity';
import { Item } from 'src/item/entities/item.entity';
import { Cotizacion } from 'src/cotizacion/entities/cotizacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleCotizacion, Item, Cotizacion])],
  controllers: [DetalleCotizacionController],
  providers: [DetalleCotizacionService],
})
export class DetalleCotizacionModule {}
