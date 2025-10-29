import { Module } from '@nestjs/common';
import { TramiteSeguroService } from './tramite-seguro.service';
import { TramiteSeguroController } from './tramite-seguro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TramiteSeguro } from './entities/tramite-seguro.entity';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Aseguradora } from 'src/aseguradora/entities/aseguradora.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TramiteSeguro, Vehiculo, Cliente, Aseguradora]),
  ],
  controllers: [TramiteSeguroController],
  providers: [TramiteSeguroService],
})
export class TramiteSeguroModule {}
