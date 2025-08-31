import { Module } from '@nestjs/common';
import { FacturaLineaService } from './factura-linea.service';
import { FacturaLineaController } from './factura-linea.controller';
import { FacturaLinea } from './entities/factura-linea.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FacturaLinea])],
  controllers: [FacturaLineaController],
  providers: [FacturaLineaService],
})
export class FacturaLineaModule {}
