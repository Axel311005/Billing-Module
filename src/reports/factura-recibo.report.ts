import { Content, TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';

export interface FacturaReciboLineItem {
  cantidad: number;
  descripcion: string;
  precioUnitario: number;
  total: number;
}

export interface FacturaReciboData {
  numeroFactura: string;
  fecha: Date | string;
  cliente: {
    nombre: string;
    direccion?: string;
    ruc?: string;
  };
  condicionPago?: string;
  moneda?: string;
  subtotal: number;
  totalImpuesto?: number;
  impuestoPorcentaje?: number;
  total: number;
  giroCheque?: string;
  lineas: FacturaReciboLineItem[];
}

const brandColor = 'black';
const accentColor = '#ff0000';
const defaultChequeMessage = 'MOTO SERVICIOS TERRY Y/O EDUARDO ALBERTO TERRY';

const companyInfo = {
  nombre: 'MOTO SERVICIOS TERRY',
  nombreLegal: 'TERRY RODRIGUEZ & CIA, LTDA.',
  servicios: 'Reparación, Ventas de Repuestos y Accesorios para motos.',
  ruc: 'J0910000261625',
  direccion: 'Dir.: Barrio El Riguero, de los Talleres Modernos',
  direccion2: '1c. al lago, 1c. abajo, Managua, Nic.',
  telefono: 'Tel.: 2252-5148',
  celular: 'Cel.: 8371-4316',
};

const resolveDateParts = (input: Date | string) => {
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) {
    return { dia: '', mes: '', ano: '' };
  }
  const dia = date.getDate().toString().padStart(2, '0');
  const mes = (date.getMonth() + 1).toString().padStart(2, '0');
  const ano = date.getFullYear().toString();
  return { dia, mes, ano };
};

const formatCurrency = (value: number, currency?: string) => {
  const safeValue =
    typeof value === 'number' && !Number.isNaN(value) ? value : 0;
  const formatted = safeValue.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return currency ? `${currency} ${formatted}` : formatted;
};

const formatQuantity = (value: number) => {
  const safeValue =
    typeof value === 'number' && !Number.isNaN(value) ? value : 0;
  return Number.isInteger(safeValue)
    ? safeValue.toString()
    : safeValue.toFixed(2);
};

const headerSection = (data: FacturaReciboData): Content => {
  const { dia, mes, ano } = resolveDateParts(data.fecha);

  return {
    columns: [
      {
        image: 'src/assets/logo-mts.jpeg',
        width: 95,
        height: 62,
        margin: [0, 0, 10, 0],
      },
      {
        width: '*',
        alignment: 'center',
        margin: [0, 0, 0, 0],
        stack: [
          {
            text: companyInfo.nombre,
            style: 'companyTitle',
            margin: [0, 0, 0, 2],
          },
          {
            text: companyInfo.nombreLegal,
            style: 'companySubtitle',
            margin: [0, 0, 0, 1],
          },
          { text: companyInfo.servicios, style: 'companyInfo' },
          { text: `RUC: ${companyInfo.ruc}`, style: 'companyInfo' },
          { text: companyInfo.direccion, style: 'companyInfo' },
          { text: companyInfo.direccion2, style: 'companyInfo' },
          {
            text: `${companyInfo.telefono} - ${companyInfo.celular}`,
            style: 'companyInfo',
          },
        ],
      },
      {
        width: 'auto',
        margin: [6, 0, -12, 0],
        stack: [
          {
            text: 'FACTURA',
            fontSize: 15,
            bold: true,
            color: brandColor,
            alignment: 'right',
          },
          {
            text: `No. ${data.numeroFactura}`,
            fontSize: 10,
            bold: true,
            color: accentColor,
            alignment: 'right',
            margin: [0, 4, 0, 8],
          },
          {
            table: {
              widths: [20, 20, 25],
              body: [
                [
                  { text: 'DIA', style: 'dateLabel' },
                  { text: 'MES', style: 'dateLabel' },
                  { text: 'AÑO', style: 'dateLabel' },
                ],
                [
                  { text: dia, style: 'dateValue' },
                  { text: mes, style: 'dateValue' },
                  { text: ano, style: 'dateValue' },
                ],
              ],
            },
            layout: {
              hLineWidth: () => 0.5,
              vLineWidth: () => 0.5,
              hLineColor: () => brandColor,
              vLineColor: () => brandColor,
            },
          },
        ],
      },
    ],
    columnGap: 20,
    margin: [0, 0, 0, 0],
  };
};

const clientSection = (data: FacturaReciboData): Content => {
  return {
    stack: [
      {
        text: [
          { text: `Cliente: `, style: 'fieldValue', bold: true },
          { text: `${data.cliente.nombre ?? ''}`, style: 'fieldValue' },
        ],
        margin: [0, 15, 0, 4],
      },
      {
        text: [
          { text: `Dirección: `, style: 'fieldValue', bold: true },
          { text: `${data.cliente.direccion ?? ''}`, style: 'fieldValue' },
        ],
        margin: [0, 0, 0, 4],
      },
      data.cliente.ruc
        ? {
            text: [
              { text: `RUC: `, bold: true, style: 'fieldValue' },
              { text: `${data.cliente.ruc}`, style: 'fieldValue' },
            ],
            margin: [0, 0, 0, 15],
          }
        : { text: '', margin: [0, 0, 0, 6] },
      //   {
      //     canvas: [
      //       {
      //         type: 'line',
      //         x1: 0,
      //         y1: 0,
      //         x2: 520,
      //         y2: 0,
      //         lineWidth: 0.5,
      //         lineColor: brandColor,
      //       },
      //     ],
      //     margin: [0, 2, 0, 8],
      //   },
    ],
  };
};

const itemsTable = (data: FacturaReciboData): Content => {
  const rows = data.lineas.map<TableCell[]>((linea) => [
    {
      text: formatQuantity(linea.cantidad),
      alignment: 'center',
      margin: [4, 5, 4, 5],
    },
    { text: linea.descripcion, margin: [6, 5, 6, 5] },
    {
      text: formatCurrency(linea.precioUnitario),
      alignment: 'right',
      margin: [6, 5, 6, 5],
    },
    {
      text: formatCurrency(linea.total),
      alignment: 'right',
      margin: [6, 5, 6, 5],
    },
  ]);

  const minRows = 10;
  while (rows.length < minRows) {
    rows.push([
      { text: ' ', margin: [4, 10, 4, 10] },
      { text: ' ', margin: [6, 10, 6, 10] },
      { text: ' ', margin: [6, 10, 6, 10] },
      { text: ' ', margin: [6, 10, 6, 10] },
    ]);
  }

  return {
    table: {
      headerRows: 1,
      widths: [70, '*', 100, 100],
      body: [
        [
          { text: 'CANTIDAD', style: 'tableHeader' },
          { text: 'DESCRIPCION', style: 'tableHeader', alignment: 'center' },
          { text: 'PRECIO UNITARIO', style: 'tableHeader' },
          { text: 'TOTAL', style: 'tableHeader' },
        ],
        ...rows,
      ],
    },
    layout: {
      hLineWidth: (i) => (i === 0 ? 1 : 0.5),
      vLineWidth: () => 0.5,
      hLineColor: () => brandColor,
      vLineColor: () => brandColor,
      fillColor: (rowIndex) => (rowIndex === 0 ? '#eef2fb' : null),
    },
  };
};

const totalsSection = (data: FacturaReciboData): Content => {
  const impuestoValor =
    typeof data.totalImpuesto === 'number' ? data.totalImpuesto : 0;
  const porc =
    typeof data.impuestoPorcentaje === 'number' &&
    !Number.isNaN(data.impuestoPorcentaje)
      ? data.impuestoPorcentaje
      : undefined;
  const porcentajeTexto =
    porc !== undefined
      ? `${porc % 1 === 0 ? porc.toFixed(0) : porc.toFixed(2)}% I.V.A.`
      : '15% I.V.A.';

  return {
    columns: [
      {
        width: '*',
        text: `Gira Cheque a nombre de: ${data.giroCheque ?? defaultChequeMessage}`,
        margin: [0, 8, 18, 0],
        fontSize: 8,
      },
      {
        width: 175,
        table: {
          widths: ['*', 90],
          body: [
            [
              { text: 'SUB-TOTAL', style: 'totalsLabel' },
              { text: formatCurrency(data.subtotal), style: 'totalsValue' },
            ],
            [
              { text: porcentajeTexto, style: 'totalsLabel' },
              { text: formatCurrency(impuestoValor), style: 'totalsValue' },
            ],
            [
              { text: 'TOTAL', style: 'totalsLabelBold' },
              { text: formatCurrency(data.total), style: 'totalsValueBold' },
            ],
          ],
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => brandColor,
          vLineColor: () => brandColor,
        },
      },
    ],
    columnGap: 25,
    margin: [0, 12, 0, 0],
  };
};

const signatureSection = (): Content => {
  return {
    columns: [
      //{ width: '*', text: '' },
      {
        width: 200,
        stack: [
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 200,
                y2: 0,
                lineWidth: 0.5,
                lineColor: brandColor,
              },
            ],
          },
          {
            text: 'FIRMA',
            alignment: 'center',
            color: brandColor,
            bold: true,
            margin: [0, 5, 0, 0],
          },
        ],
      },
      { width: '*', text: '' },
    ],
    margin: [0, 30, 0, 0],
  };
};

const gratitudeSection = (): Content => ({
  text: 'GRACIAS POR TU COMPRA',
  alignment: 'right',
  color: brandColor,
  bold: true,
  margin: [0, 15, 0, 0],
});

export const createFacturaReciboDocument = (
  data: FacturaReciboData,
): TDocumentDefinitions => {
  return {
    pageSize: 'LETTER',
    pageOrientation: 'portrait',
    pageMargins: [35, 30, 35, 45],
    content: [
      headerSection(data),
      clientSection(data),
      itemsTable(data),
      totalsSection(data),
      signatureSection(),
      gratitudeSection(),
    ],
    styles: {
      companyTitle: {
        fontSize: 18,
        bold: true,
        color: brandColor,
      },
      companySubtitle: {
        fontSize: 10,
        bold: true,
        color: brandColor,
      },
      companyInfo: {
        fontSize: 9,
        color: brandColor,
      },
      dateLabel: {
        fontSize: 9,
        color: brandColor,
        alignment: 'center',
        bold: true,
        margin: [0, 5, 0, 2],
      },
      dateValue: {
        fontSize: 9,
        alignment: 'center',
        margin: [0, 3, 0, 5],
      },
      fieldLabel: {
        fontSize: 9,
        color: brandColor,
        bold: true,
      },
      fieldValue: {
        fontSize: 9,
      },
      tableHeader: {
        fontSize: 9,
        color: brandColor,
        alignment: 'center',
        bold: true,
        margin: [0, 6, 0, 6],
      },
      totalsLabel: {
        fontSize: 9,
        bold: true,
        color: brandColor,
        margin: [5, 5, 5, 5],
      },
      totalsValue: {
        fontSize: 9,
        alignment: 'right',
        margin: [5, 5, 5, 5],
      },
      totalsLabelBold: {
        fontSize: 10,
        bold: true,
        color: brandColor,
        margin: [5, 5, 5, 5],
      },
      totalsValueBold: {
        fontSize: 10,
        bold: true,
        alignment: 'right',
        margin: [5, 5, 5, 5],
      },
    },
    defaultStyle: {
      fontSize: 9,
    },
  };
};
