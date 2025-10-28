import { Module } from '@nestjs/common';
import { TramiteSeguroService } from './tramite-seguro.service';
import { TramiteSeguroController } from './tramite-seguro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TramiteSeguro } from './entities/tramite-seguro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TramiteSeguro])],
  controllers: [TramiteSeguroController],
  providers: [TramiteSeguroService],
})
export class TramiteSeguroModule {}




