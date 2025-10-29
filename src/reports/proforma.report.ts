import { Content, TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';

export interface ProformaLineItem {
  cantidad: number;
  descripcion: string;
  precioUnitario: number;
  total: number;
}

export interface ProformaVehicleInfo {
  expediente?: string;
  clienteNombre?: string;
  celular?: string;
  modelo?: string;
  motor?: string;
  chasis?: string;
  placa?: string;
  color?: string;
  anio?: string | number;
}

export interface ProformaReportData {
  numeroProforma: string;
  fecha: Date | string;
  vehiculo: ProformaVehicleInfo;
  monedaSimbolo?: string;
  monedaNombre?: string;
  subtotal: number;
  iva: number;
  ivaPorcentaje?: number;
  total: number;
  lineas: ProformaLineItem[];
  nota?: string;
  chequeNombre?: string;
  observaciones?: string;
}

const defaultCurrency = 'C$';
const brandColor = 'black';
const accentColor = '#1a1a1a';
const secondaryColor = '#e0e0e0';
const defaultNote =
  'Nota: No aceptamos devoluciones después de emitida la factura';
const defaultChequeMessage =
  'Favor emitir cheque a nombre: Eduardo Alberto Terry Mendoza';

const companyInfo = {
  nombre: 'Moto Servicio Terry',
  descripcion: 'Reparación y venta, de repuestos y accesorios para moto',
  direccion: 'Barrio Riguero, de los Talleres Modernos 1c al norte, 1c abajo',
  telefono: 'Tel: 22525148',
  ruc: 'No. RUC: J0910000261625',
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

const formatCurrency = (value: number, symbol?: string) => {
  const safeValue =
    typeof value === 'number' && !Number.isNaN(value) ? value : 0;
  const formatted = safeValue.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const resolvedSymbol = symbol ?? defaultCurrency;
  return `${resolvedSymbol} ${formatted}`.trim();
};

const formatQuantity = (value: number) => {
  const safeValue =
    typeof value === 'number' && !Number.isNaN(value) ? value : 0;
  return Number.isInteger(safeValue)
    ? safeValue.toString()
    : safeValue.toFixed(2);
};

const headerSection = (data: ProformaReportData): Content => {
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
        stack: [
          { text: companyInfo.nombre, style: 'companyTitle' },
          { text: companyInfo.descripcion, style: 'companyInfo' },
          { text: companyInfo.direccion, style: 'companyInfo' },
          { text: companyInfo.telefono, style: 'companyInfo' },
          { text: companyInfo.ruc, style: 'companyInfo' },
        ],
      },
      {
        width: 120,
        stack: [
          {
            text: 'PROFORMA',
            fontSize: 14,
            bold: true,
            color: brandColor,
            alignment: 'center',
          },
          {
            text: data.numeroProforma ?? '',
            fontSize: 11,
            bold: true,
            color: accentColor,
            margin: [0, 2, 0, 4],
            alignment: 'center',
          },
          {
            table: {
              widths: [30, 30, 40],
              body: [
                [
                  { text: 'DÍA', style: 'dateLabel' },
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
    margin: [0, 0, 0, 10],
  };
};

const vehicleDetailsSection = (data: ProformaReportData): Content => {
  const vehiculo = data.vehiculo ?? {};

  const body: TableCell[][] = [
    [
      { text: 'EXPEDIENTE', style: 'detailLabel' },
      { text: (vehiculo.expediente ?? '').toUpperCase(), style: 'detailValue' },
      { text: 'MODELO', style: 'detailLabel' },
      { text: vehiculo.modelo ?? '', style: 'detailValue' },
    ],
    [
      { text: 'NOMBRE', style: 'detailLabel' },
      { text: vehiculo.clienteNombre ?? '', style: 'detailValue' },
      { text: 'MOTOR', style: 'detailLabel' },
      { text: vehiculo.motor ?? '', style: 'detailValue' },
    ],
    [
      { text: 'CELULAR', style: 'detailLabel' },
      { text: vehiculo.celular ?? '', style: 'detailValue' },
      { text: 'CHASIS', style: 'detailLabel' },
      { text: vehiculo.chasis ?? '', style: 'detailValue' },
    ],
    [
      { text: 'PLACA', style: 'detailLabel' },
      { text: vehiculo.placa ?? '', style: 'detailValue' },
      { text: 'COLOR', style: 'detailLabel' },
      { text: vehiculo.color ?? '', style: 'detailValue' },
    ],
    [
      { text: 'AÑO/MOTO', style: 'detailLabel' },
      {
        text: vehiculo.anio ? String(vehiculo.anio) : '',
        style: 'detailValue',
      },
      { text: '', style: 'detailLabel' },
      { text: '', style: 'detailValue' },
    ],
  ];

  const table: Content = {
    table: {
      widths: [80, '*', 80, '*'],
      body,
    },
    layout: {
      hLineWidth: () => 0.5,
      vLineWidth: () => 0.5,
      hLineColor: () => secondaryColor,
      vLineColor: () => secondaryColor,
      paddingTop: () => 4,
      paddingBottom: () => 4,
      paddingLeft: (i: number) => (i === 0 || i === 2 ? 6 : 3),
      paddingRight: () => 4,
    },
    margin: [0, 0, 0, 12],
  };

  if (data.observaciones) {
    return {
      stack: [
        table,
        {
          text: `Observaciones: ${data.observaciones}`,
          margin: [0, 2, 0, 12],
          fontSize: 9,
        },
      ],
    };
  }

  return table;
};

const itemsTable = (data: ProformaReportData): Content => {
  const rows = data.lineas.map<TableCell[]>((linea) => [
    {
      text: formatQuantity(linea.cantidad),
      alignment: 'center',
      margin: [4, 4, 4, 4],
    },
    { text: linea.descripcion ?? '', margin: [4, 4, 4, 4] },
    {
      text: formatCurrency(linea.precioUnitario, data.monedaSimbolo),
      alignment: 'right',
      margin: [4, 4, 4, 4],
    },
    {
      text: formatCurrency(linea.total, data.monedaSimbolo),
      alignment: 'right',
      margin: [4, 4, 4, 4],
    },
  ]);

  const minRows = 14;
  while (rows.length < minRows) {
    rows.push([
      { text: ' ', margin: [4, 6, 4, 6] },
      { text: ' ', margin: [4, 6, 4, 6] },
      { text: ' ', margin: [4, 6, 4, 6] },
      { text: ' ', margin: [4, 6, 4, 6] },
    ]);
  }

  return {
    table: {
      headerRows: 1,
      widths: [70, '*', 100, 100],
      body: [
        [
          { text: 'CANTIDAD', style: 'tableHeader' },
          { text: 'DESCRIPCIÓN', style: 'tableHeader' },
          { text: 'P/UNITARIO', style: 'tableHeader', alignment: 'right' },
          { text: 'TOTAL', style: 'tableHeader', alignment: 'right' },
        ],
        ...rows,
      ],
    },
    layout: {
      hLineWidth: (i) => (i === 0 ? 1 : 0.5),
      vLineWidth: () => 0.5,
      hLineColor: () => brandColor,
      vLineColor: () => brandColor,
      fillColor: (rowIndex) => (rowIndex === 0 ? '#f2f2f2' : null),
    },
  };
};

const totalsSection = (data: ProformaReportData): Content => {
  const ivaLabel = (() => {
    if (data.ivaPorcentaje === undefined) {
      return 'IVA';
    }
    const porcentaje = Number(data.ivaPorcentaje);
    const formattedPorcentaje = Number.isInteger(porcentaje)
      ? porcentaje.toFixed(0)
      : porcentaje.toFixed(2);
    return `IVA (${formattedPorcentaje}%)`;
  })();

  return {
    columns: [
      {
        width: '*',
        stack: (() => {
          const items: Content[] = [
            {
              text: data.nota ?? defaultNote,
              margin: [0, 4, 0, 2],
              fontSize: 8,
            },
            {
              text: data.chequeNombre ?? defaultChequeMessage,
              fontSize: 8,
            },
          ];

          if (data.monedaNombre) {
            items.push({
              text: `Moneda: ${data.monedaNombre}`,
              fontSize: 8,
              margin: [0, 4, 0, 0],
            });
          }

          return items;
        })(),
      },
      {
        width: 190,
        table: {
          widths: ['*', 90],
          body: [
            [
              { text: 'SUBTOTAL', style: 'totalsLabel' },
              {
                text: formatCurrency(data.subtotal, data.monedaSimbolo),
                style: 'totalsValue',
              },
            ],
            [
              { text: ivaLabel, style: 'totalsLabel' },
              {
                text: formatCurrency(data.iva, data.monedaSimbolo),
                style: 'totalsValue',
              },
            ],
            [
              { text: 'TOTAL', style: 'totalsLabelBold' },
              {
                text: formatCurrency(data.total, data.monedaSimbolo),
                style: 'totalsValueBold',
              },
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

export const createProformaDocument = (
  data: ProformaReportData,
): TDocumentDefinitions => {
  return {
    pageSize: 'LETTER',
    pageOrientation: 'portrait',
    pageMargins: [35, 30, 35, 45],
    content: [
      headerSection(data),
      vehicleDetailsSection(data),
      itemsTable(data),
      totalsSection(data),
    ],
    styles: {
      companyTitle: {
        fontSize: 16,
        bold: true,
        color: brandColor,
      },
      companyInfo: {
        fontSize: 9,
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
      detailLabel: {
        fontSize: 9,
        bold: true,
        color: brandColor,
      },
      detailValue: {
        fontSize: 9,
      },
      tableHeader: {
        fontSize: 9,
        color: brandColor,
        bold: true,
        alignment: 'center',
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
