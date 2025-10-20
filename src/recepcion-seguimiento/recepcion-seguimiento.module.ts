import { Module } from '@nestjs/common';
import { RecepcionSeguimientoService } from './recepcion-seguimiento.service';
import { RecepcionSeguimientoController } from './recepcion-seguimiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecepcionSeguimiento } from './entities/recepcion-seguimiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecepcionSeguimiento])],
  controllers: [RecepcionSeguimientoController],
  providers: [RecepcionSeguimientoService],
})
export class RecepcionSeguimientoModule {}
