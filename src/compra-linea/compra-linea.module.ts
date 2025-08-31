import { Module } from '@nestjs/common';
import { CompraLineaService } from './compra-linea.service';
import { CompraLineaController } from './compra-linea.controller';
import { CompraLinea } from './entities/compra-linea.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CompraLinea])],
  controllers: [CompraLineaController],
  providers: [CompraLineaService],
})
export class CompraLineaModule {}
