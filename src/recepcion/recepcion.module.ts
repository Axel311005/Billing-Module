import { Module } from '@nestjs/common';
import { RecepcionService } from './recepcion.service';
import { RecepcionController } from './recepcion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recepcion } from './entities/recepcion.entity';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recepcion, Vehiculo, Empleado])],
  controllers: [RecepcionController],
  providers: [RecepcionService],
})
export class RecepcionModule {}
