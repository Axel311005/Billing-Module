import { Module } from '@nestjs/common';
import { ImpuestoService } from './impuesto.service';
import { ImpuestoController } from './impuesto.controller';
import { Impuesto } from './entities/impuesto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Impuesto])],
  controllers: [ImpuestoController],
  providers: [ImpuestoService],
})
export class ImpuestoModule {}
