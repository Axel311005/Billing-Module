import { Module } from '@nestjs/common';
import { ExistenciaBodegaService } from './existencia-bodega.service';
import { ExistenciaBodegaController } from './existencia-bodega.controller';
import { ExistenciaBodega } from './entities/existencia-bodega.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/item/entities/item.entity';
import { Bodega } from 'src/bodega/entities/bodega.entity';
import { PrinterModule } from 'src/printer/printer.module';
import { ReciboReportService } from 'src/reports/recibo-report.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExistenciaBodega, Item, Bodega]),
    PrinterModule,
  ],
  controllers: [ExistenciaBodegaController],
  providers: [ExistenciaBodegaService, ReciboReportService],
})
export class ExistenciaBodegaModule {}
