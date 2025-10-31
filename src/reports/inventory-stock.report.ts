import { Content, TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';

export interface InventoryStockReportItem {
  codigo: string;
  descripcion: string;
  bodega?: string;
  categoria?: string;
  unidad?: string;
  cantDisponible: number;
  existenciaMinima?: number;
  puntoReorden?: number;
  existenciaMaxima?: number;
}

export interface InventoryStockReportMeta {
  generadoPor?: string;
  filtros?: Record<string, string | number | undefined | null>;
}

export interface InventoryStockReportSummary {
  totalItems?: number;
  totalBodegas?: number;
  totalDisponible?: number;
}

export interface InventoryStockReportData {
  titulo?: string;
  generadoEn?: Date | string;
  meta?: InventoryStockReportMeta;
  resumen?: InventoryStockReportSummary;
  items: InventoryStockReportItem[];
}

const companyInfo = {
  nombre: 'Moto Servicio Terry',
  descripcion: 'Reparación y venta de repuestos y accesorios para moto',
  direccion: 'Barrio Riguero, de los Talleres Modernos 1c al norte, 1c abajo',
  telefono: 'Tel: 22525148',
  ruc: 'No. RUC: J0910000261625',
};

const brandColor = '#1f2a44';
const accentColor = '#f1f4fb';
const warningColor = '#fdecea';
const warningTextColor = '#b3261e';
const neutralColor = '#f6f7fb';
const defaultTitle = 'Reporte de existencias de inventario';

const formatDateTime = (input?: Date | string): string => {
  if (!input) {
    return new Date().toLocaleString('es-NI');
  }
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) {
    return new Date().toLocaleString('es-NI');
  }
  return date.toLocaleString('es-NI');
};

const formatNumber = (value: number | string | undefined | null): string => {
  if (value === undefined || value === null || value === '') {
    return '0';
  }

  const numeric = Number(value);
  const safeNumeric = Number.isNaN(numeric) ? 0 : numeric;

  return safeNumeric.toLocaleString('es-NI', {
    minimumFractionDigits: Number.isInteger(safeNumeric) ? 0 : 2,
    maximumFractionDigits: 2,
  });
};

const computeSummary = (
  items: InventoryStockReportItem[],
  overrides?: InventoryStockReportSummary,
): Required<InventoryStockReportSummary> => {
  const totalDisponible = items.reduce(
    (acc, item) => acc + Number(item.cantDisponible ?? 0),
    0,
  );
  const bodegas = new Set(
    items
      .map((item) => item.bodega)
      .filter(
        (value): value is string =>
          typeof value === 'string' && value.trim().length > 0,
      ),
  );

  return {
    totalItems: overrides?.totalItems ?? items.length,
    totalBodegas: overrides?.totalBodegas ?? bodegas.size,
    totalDisponible: overrides?.totalDisponible ?? totalDisponible,
  };
};

const buildFiltersSection = (
  meta?: InventoryStockReportMeta,
): Content | null => {
  if (!meta) {
    return null;
  }

  const content: Content[] = [];

  if (meta.generadoPor && meta.generadoPor.trim().length > 0) {
    content.push({
      text: `Generado por: ${meta.generadoPor.trim()}`,
      margin: [0, 0, 0, 3],
    });
  }

  const entries = Object.entries(meta.filtros ?? {}).filter(([, value]) => {
    if (value === undefined || value === null) {
      return false;
    }
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return true;
  });

  if (entries.length === 0) {
    if (content.length === 0) {
      return null;
    }
    return { stack: content, margin: [0, 6, 0, 0] };
  }

  const tableBody: TableCell[][] = entries.map(([label, value]) => [
    {
      text: label,
      bold: true,
      color: brandColor,
      margin: [4, 3, 4, 3],
    },
    {
      text: typeof value === 'number' ? formatNumber(value) : String(value),
      margin: [4, 3, 4, 3],
    },
  ]);

  content.push({
    table: {
      widths: [120, '*'],
      body: tableBody,
    },
    layout: {
      hLineWidth: () => 0.5,
      vLineWidth: () => 0.5,
      hLineColor: () => '#cccccc',
      vLineColor: () => '#cccccc',
      paddingLeft: (i: number) => (i === 0 ? 6 : 4),
      paddingRight: () => 4,
    },
  });

  return {
    stack: content,
    margin: [0, 6, 0, 0],
  };
};

const headerSection = (data: InventoryStockReportData): Content => {
  return {
    columns: [
      {
        image: 'src/assets/logo-mts.jpeg',
        width: 105,
        height: 68,
        alignment: 'right',
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
          {
            text: `Generado: ${formatDateTime(data.generadoEn)}`,
            fontSize: 9,
            alignment: 'center',
            margin: [0, 6, 0, 0],
          },
        ],
        alignment: 'center',
      },
      {
        width: 105,
        text: '',
      },
    ],
    columnGap: 16,
    margin: [0, 0, 0, 10],
  };
};

const titleSection = (data: InventoryStockReportData): Content => {
  return {
    stack: [
      {
        text: data.titulo ?? defaultTitle,
        style: 'reportTitle',
        margin: [0, 6, 0, 4],
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 40,
            y1: 0,
            x2: 420,
            y2: 0,
            lineWidth: 1.2,
            lineColor: brandColor,
          },
        ],
        margin: [0, 0, 0, 10],
      },
    ],
    alignment: 'center',
  };
};

const summarySection = (data: InventoryStockReportData): Content => {
  const summary = computeSummary(data.items, data.resumen);

  return {
    table: {
      widths: ['*', '*', '*'],
      body: [
        [
          { text: 'Total de registros', style: 'summaryLabel' },
          { text: 'Total de bodegas', style: 'summaryLabel' },
          { text: 'Existencia total', style: 'summaryLabel' },
        ],
        [
          { text: formatNumber(summary.totalItems), style: 'summaryValue' },
          { text: formatNumber(summary.totalBodegas), style: 'summaryValue' },
          {
            text: formatNumber(summary.totalDisponible),
            style: 'summaryValue',
          },
        ],
      ],
    },
    layout: {
      hLineWidth: () => 0,
      vLineWidth: () => 0,
      paddingLeft: () => 10,
      paddingRight: () => 10,
      paddingTop: (rowIndex: number) => (rowIndex === 0 ? 12 : 8),
      paddingBottom: (rowIndex: number) => (rowIndex === 0 ? 12 : 8),
      fillColor: (rowIndex: number) => (rowIndex === 0 ? accentColor : null),
    },
    margin: [25, 4, 25, 18],
  };
};

const itemsTable = (data: InventoryStockReportData): Content => {
  const rows = data.items.map<TableCell[]>((item) => {
    const highlight =
      typeof item.puntoReorden === 'number' &&
      !Number.isNaN(item.puntoReorden) &&
      Number(item.cantDisponible ?? 0) <= item.puntoReorden;

    const baseCell = (
      text: string,
      alignment: 'left' | 'center' | 'right' = 'left',
    ): TableCell => {
      const cell: TableCell = {
        text,
        alignment,
        margin: [4, 4, 4, 4],
      };

      if (highlight) {
        (cell as any).fillColor = warningColor;
        if (alignment !== 'left') {
          (cell as any).color = warningTextColor;
        }
      }

      return cell;
    };

    return [
      baseCell(item.codigo ?? ''),
      baseCell(item.descripcion ?? ''),
      baseCell(item.bodega ?? ''),
      baseCell(item.unidad ?? ''),
      baseCell(formatNumber(item.cantDisponible), 'right'),
      baseCell(formatNumber(item.existenciaMinima ?? undefined), 'right'),
      baseCell(formatNumber(item.puntoReorden ?? undefined), 'right'),
      baseCell(formatNumber(item.existenciaMaxima ?? undefined), 'right'),
    ];
  });

  if (rows.length === 0) {
    rows.push([
      {
        text: 'No se encontraron registros con los filtros aplicados.',
        colSpan: 8,
        alignment: 'center',
        margin: [8, 10, 8, 10],
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ]);
  }

  return {
    table: {
      headerRows: 1,
      widths: [52, 'auto', 70, 55, 55, 55, 55, 55],
      body: [
        [
          { text: 'Código', style: 'tableHeader' },
          { text: 'Descripción', style: 'tableHeader' },
          { text: 'Bodega', style: 'tableHeader' },
          { text: 'Unidad', style: 'tableHeader', alignment: 'center' },
          { text: 'Disponible', style: 'tableHeader', alignment: 'right' },
          { text: 'Mínima', style: 'tableHeader', alignment: 'right' },
          { text: 'Reorden', style: 'tableHeader', alignment: 'right' },
          { text: 'Máxima', style: 'tableHeader', alignment: 'right' },
        ],
        ...rows,
      ],
    },
    layout: {
      hLineWidth: (i: number, node: any) =>
        i === 0 || i === node.table.body.length ? 0.8 : 0.3,
      vLineWidth: (i: number, node: any) =>
        i === 0 || i === node.table.widths.length ? 0 : 0.2,
      hLineColor: () => '#c5c9d6',
      vLineColor: () => '#d3d6e2',
      fillColor: (rowIndex: number) => (rowIndex === 0 ? neutralColor : null),
      paddingLeft: () => 6,
      paddingRight: () => 6,
      paddingTop: () => 4,
      paddingBottom: () => 4,
    },
    margin: [0, 0, 0, 0],
  };
};

export const createInventoryStockDocument = (
  data: InventoryStockReportData,
): TDocumentDefinitions => {
  const filtersSection = buildFiltersSection(data.meta);

  return {
    pageSize: 'LETTER',
    pageOrientation: 'portrait',
    pageMargins: [35, 30, 35, 40],
    content: [
      headerSection(data),
      titleSection(data),
      ...(filtersSection ? [filtersSection] : []),
      summarySection(data),
      itemsTable(data),
    ],
    styles: {
      companyTitle: {
        fontSize: 14,
        bold: true,
        color: brandColor,
        alignment: 'center',
      },
      companyInfo: {
        fontSize: 9,
        alignment: 'center',
      },
      reportTitle: {
        fontSize: 12,
        bold: true,
        color: brandColor,
        alignment: 'center',
      },
      summaryLabel: {
        fontSize: 9,
        bold: true,
        color: brandColor,
        alignment: 'center',
        margin: [0, 0, 0, 4],
      },
      summaryValue: {
        fontSize: 12,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 0],
      },
      tableHeader: {
        fontSize: 8,
        bold: true,
        color: brandColor,
        margin: [4, 6, 4, 6],
      },
    },
    defaultStyle: {
      fontSize: 8,
    },
    footer: (currentPage: number, pageCount: number) => ({
      columns: [
        {
          text: `MTS Web - Página ${currentPage} de ${pageCount}`,
          alignment: 'right',
          fontSize: 8,
          margin: [0, 10, 35, 0],
        },
      ],
    }),
  };
};
