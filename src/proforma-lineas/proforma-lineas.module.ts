import { Module } from '@nestjs/common';
import { ProformaLineasService } from './proforma-lineas.service';
import { ProformaLineasController } from './proforma-lineas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProformaLineas } from './entities/proforma-lineas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProformaLineas])],
  controllers: [ProformaLineasController],
  providers: [ProformaLineasService],
})
export class ProformaLineasModule {}
