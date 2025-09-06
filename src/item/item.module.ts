import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ClasificacionItem } from 'src/clasificacion-item/entities/clasificacion-item.entity';
import { UnidadMedida } from 'src/unidad-medida/entities/unidad-medida.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, ClasificacionItem, UnidadMedida])],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
