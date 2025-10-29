import { Module } from '@nestjs/common';
import { ProformaLineasService } from './proforma-lineas.service';
import { ProformaLineasController } from './proforma-lineas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProformaLineas } from './entities/proforma-lineas.entity';
import { Proforma } from 'src/proforma/entities/proforma.entity';
import { Item } from 'src/item/entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProformaLineas, Proforma, Item])],
  controllers: [ProformaLineasController],
  providers: [ProformaLineasService],
})
export class ProformaLineasModule {}
