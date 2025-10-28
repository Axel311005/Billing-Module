import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { CreateStoreReportDto } from './dto/create-store-report.dto';
import { UpdateStoreReportDto } from './dto/update-store-report.dto';
import { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('orders/:orderId')
  async findAll(@Res() response: Response, @Param('orderId') orderId: string) {
    //return this.storeReportsService.getOrderByIdReport();

    const pdfDoc = await this.storeReportsService.getOrderByIdReport(+orderId);

    // response.setHeader('Content-Type', 'application/pdf');
    // pdfDoc.info.Title = 'Order-Report.pdf';
    // pdfDoc.pipe(response);
    // pdfDoc.end();
  }

  @Get('svgs-charts')
  async getSvgChart(@Res() response: Response) {
    const pdfDoc = await this.storeReportsService.getSvgChart();

    // response.setHeader('Content-Type', 'application/pdf');
    // pdfDoc.info.Title = 'Svg-Chart-Report.pdf';
    // pdfDoc.pipe(response);
    // pdfDoc.end();
  }

  @Get('statistics')
  async statistics(@Res() response: Response) {
    const pdfDoc = await this.storeReportsService.getStatistics();

    // response.setHeader('Content-Type', 'application/pdf');
    // pdfDoc.info.Title = 'Svg-Chart-Report.pdf';
    // pdfDoc.pipe(response);
    // pdfDoc.end();
  }
}
