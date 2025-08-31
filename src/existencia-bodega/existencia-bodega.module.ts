import { Module } from '@nestjs/common';
import { ExistenciaBodegaService } from './existencia-bodega.service';
import { ExistenciaBodegaController } from './existencia-bodega.controller';
import { ExistenciaBodega } from './entities/existencia-bodega.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ExistenciaBodega])],
  controllers: [ExistenciaBodegaController],
  providers: [ExistenciaBodegaService],
})
export class ExistenciaBodegaModule {}
