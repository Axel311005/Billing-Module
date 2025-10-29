import { Module } from '@nestjs/common';
import { MotivoCitaService } from './motivo-cita.service';
import { MotivoCitaController } from './motivo-cita.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotivoCita } from './entities/motivo-cita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MotivoCita])],
  controllers: [MotivoCitaController],
  providers: [MotivoCitaService],
})
export class MotivoCitaModule {}





