import { Module } from '@nestjs/common';
import { ConsecutivoService } from './consecutivo.service';
import { ConsecutivoController } from './consecutivo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consecutivo } from './entities/consecutivo.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Consecutivo])],
  controllers: [ConsecutivoController],
  providers: [ConsecutivoService],
  exports : [ConsecutivoService],
})
export class ConsecutivoModule {}
