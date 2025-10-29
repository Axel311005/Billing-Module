import { Module } from '@nestjs/common';
import { CitaService } from './cita.service';
import { CitaController } from './cita.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { MotivoCita } from 'src/motivo-cita/entities/motivo-cita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cita, Cliente, Vehiculo, MotivoCita])],
  controllers: [CitaController],
  providers: [CitaService],
})
export class CitaModule {}
