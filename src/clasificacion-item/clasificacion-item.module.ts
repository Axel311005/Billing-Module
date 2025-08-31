import { Module } from '@nestjs/common';
import { ClasificacionItemService } from './clasificacion-item.service';
import { ClasificacionItemController } from './clasificacion-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClasificacionItem } from './entities/clasificacion-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClasificacionItem])],
  controllers: [ClasificacionItemController],
  providers: [ClasificacionItemService],
})
export class ClasificacionItemModule {}
