import { Module } from '@nestjs/common';
import { MonedaService } from './moneda.service';
import { MonedaController } from './moneda.controller';
import { Moneda } from './entities/moneda.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Moneda])],
  controllers: [MonedaController],
  providers: [MonedaService],
})
export class MonedaModule {}
