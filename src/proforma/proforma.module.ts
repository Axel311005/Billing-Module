import { Module } from '@nestjs/common';
import { ProformaService } from './proforma.service';
import { ProformaController } from './proforma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proforma } from './entities/proforma.entity';
import { TramiteSeguro } from 'src/tramite-seguro/entities/tramite-seguro.entity';
import { Consecutivo } from 'src/consecutivo/entities/consecutivo.entity';
import { ConsecutivoModule } from 'src/consecutivo/consecutivo.module';
import { PrinterModule } from 'src/printer/printer.module';
import { ReciboReportService } from 'src/reports/recibo-report.service';
import { Moneda } from 'src/moneda/entities/moneda.entity';
import { Impuesto } from 'src/impuesto/entities/impuesto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Proforma,
      TramiteSeguro,
      Consecutivo,
      Moneda,
      Impuesto,
    ]),
    ConsecutivoModule,
    PrinterModule,
  ],
  controllers: [ProformaController],
  providers: [ProformaService, ReciboReportService],
})
export class ProformaModule {}
