import { Module } from '@nestjs/common';
import { ExistenciaBodegaService } from './existencia-bodega.service';
import { ExistenciaBodegaController } from './existencia-bodega.controller';
import { ExistenciaBodega } from './entities/existencia-bodega.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/item/entities/item.entity';
import { Bodega } from 'src/bodega/entities/bodega.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExistenciaBodega, Item, Bodega]),
  ],
  controllers: [ExistenciaBodegaController],
  providers: [ExistenciaBodegaService],
})
export class ExistenciaBodegaModule {}
