import { Module } from '@nestjs/common';
import { TipoPagoService } from './tipo-pago.service';
import { TipoPagoController } from './tipo-pago.controller';
import { TipoPago } from './entities/tipo-pago.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TipoPago])],
  controllers: [TipoPagoController],
  providers: [TipoPagoService],
})
export class TipoPagoModule {}
