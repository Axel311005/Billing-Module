import { Module } from '@nestjs/common';
import { MovimientoCajaService } from './movimiento-caja.service';
import { MovimientoCajaController } from './movimiento-caja.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoCaja } from './entities/movimiento-caja.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovimientoCaja])],
  controllers: [MovimientoCajaController],
  providers: [MovimientoCajaService],
})
export class MovimientoCajaModule {}
