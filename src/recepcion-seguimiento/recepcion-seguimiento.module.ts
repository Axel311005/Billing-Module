import { Module } from '@nestjs/common';
import { RecepcionSeguimientoService } from './recepcion-seguimiento.service';
import { RecepcionSeguimientoController } from './recepcion-seguimiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecepcionSeguimiento } from './entities/recepcion-seguimiento.entity';
import { Recepcion } from 'src/recepcion/entities/recepcion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecepcionSeguimiento, Recepcion])],
  controllers: [RecepcionSeguimientoController],
  providers: [RecepcionSeguimientoService],
})
export class RecepcionSeguimientoModule {}
