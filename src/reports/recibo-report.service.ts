import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrinterService } from 'src/printer/printer.service';
import { createReciboDocument, ReciboData } from './recibo.report';

@Injectable()
export class ReciboReportService {
  constructor(private readonly printerService: PrinterService) {}

  async generateReciboPDF(data: ReciboData, response: Response): Promise<void> {
    const docDefinition = createReciboDocument(data);
    const pdfDoc = this.printerService.createPdf(docDefinition);

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      `attachment; filename="recibo-${data.numeroRecibo}.pdf"`,
    );
    pdfDoc.info.Title = `Recibo ${data.numeroRecibo}`;
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  createReciboBuffer(data: ReciboData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const docDefinition = createReciboDocument(data);
      const pdfDoc = this.printerService.createPdf(docDefinition);

      const chunks: Buffer[] = [];

      pdfDoc.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });

      pdfDoc.on('end', () => {
        resolve(Buffer.concat(chunks));
      });

      pdfDoc.on('error', (error: Error) => {
        reject(error);
      });
    });
  }
}

