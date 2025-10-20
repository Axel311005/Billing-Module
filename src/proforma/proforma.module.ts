import { Module } from '@nestjs/common';
import { ProformaService } from './proforma.service';
import { ProformaController } from './proforma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proforma } from './entities/proforma.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proforma])],
  controllers: [ProformaController],
  providers: [ProformaService],
})
export class ProformaModule {}
