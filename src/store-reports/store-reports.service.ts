import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateStoreReportDto } from './dto/create-store-report.dto';
import { UpdateStoreReportDto } from './dto/update-store-report.dto';
import { PrinterService } from 'src/printer/printer.service';
// import {
//   getBasicChartSvgReport,
//   getHelloWorldReport,
//   getStatisticsReport,
//   orderByIdReport,
// } from 'src/reports';
// import { PrismaClient } from '@prisma/client';

@Injectable()
export class StoreReportsService {
  constructor(private readonly printerService: PrinterService) {
    // super();
  }

  async getOrderByIdReport(orderId: number) {
    // const order = await this.orders.findUnique({
    //   where: {
    //     order_id: orderId,
    //   },
    //   include: {
    //     customers: true,
    //     order_details: {
    //       include: {
    //         products: true,
    //       },
    //     },
    //   },
    // });
    // if (!order) {
    //   throw new NotFoundException(`Order with id ${orderId} not found`);
    // }
    // //console.log(JSON.stringify(order, null, 2));
    // const docDefinition = orderByIdReport({
    //   data: order as any,
    // });
    // const doc = this.printerService.createPdf(docDefinition);
    // return doc;
  }

  async getSvgChart() {
    // const docDefinition = await getBasicChartSvgReport();
    // const doc = this.printerService.createPdf(docDefinition);
    // return doc;
  }

  async getStatistics() {
    // const topCountries = await this.customers.groupBy({
    //   by: ['country'],
    //   _count: true,
    //   orderBy: {
    //     _count: {
    //       country: 'desc',
    //     },
    //   },
    //   take: 10,
    // });
    // const topCountryData = topCountries.map(({ country, _count }) => ({
    //   country: country,
    //   customer: _count,
    // }));
    // console.log(topCountries);
    // const docDefinition = await getStatisticsReport({
    //   topCountries: topCountryData,
    // });
    // const doc = this.printerService.createPdf(docDefinition);
    // return doc;
  }
}
