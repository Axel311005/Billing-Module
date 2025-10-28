import { Module } from '@nestjs/common';
import { RecepcionService } from './recepcion.service';
import { RecepcionController } from './recepcion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recepcion } from './entities/recepcion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recepcion])],
  controllers: [RecepcionController],
  providers: [RecepcionService],
})
export class RecepcionModule {}




