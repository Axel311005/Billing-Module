import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';

export interface ReciboData {
  numeroRecibo: string;
  fecha: Date;
  recibidoDe: string;
  cantidad: string;
  concepto: string;
  empleado?: string;
}

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

// Header con información de la empresa en fila horizontal
const headerCompanyInfo = (): Content => {
  return {
    columns: [
      // Logo a la izquierda
      {
        image: 'src/assets/logo-mts.jpeg',
        width: 110,
        height: 70,
        alignment: 'left',
      },
      // Información de la empresa centrada a la derecha
      {
        stack: [
          {
            text: companyInfo.nombre,
            fontSize: 25,
            bold: true,
            color: '#0514E6',
            //alignment: 'center',
            margin: [95, 0, 0, 0],
          },
          {
            text: companyInfo.nombreLegal,
            fontSize: 12,
            color: '#0514E6',
            //alignment: 'center',
            margin: [150, 0, 0, 0],
          },
          {
            text: companyInfo.servicios,
            fontSize: 12,
            color: '#0514E6',
            //alignment: 'center',
            margin: [85, 0, 0, 0],
          },
          {
            text: `RUC: ${companyInfo.ruc}`,
            fontSize: 12,
            color: '#0514E6',
            //alignment: 'center',
            margin: [170, 0, 0, 0],
          },
          {
            text: companyInfo.direccion,
            fontSize: 12,
            color: '#0514E6',
            //alignment: 'center',
            margin: [110, 0, 0, 0],
          },
          {
            text: companyInfo.direccion2,
            fontSize: 12,
            color: '#0514E6',
            //alignment: 'center',
            margin: [140, 0, 0, 0],
          },
          {
            text: `${companyInfo.telefono} - ${companyInfo.celular}`,
            fontSize: 12,
            color: '#0514E6',
            //alignment: 'center',
            margin: [150, 0, 0, 0],
          },
        ],
        //width: '*',
        //alignment: 'center',
      },
    ],
    columnGap: 20,
    margin: [0, 0, 0, 15],
  };
};

// Título del recibo
const reciboTitle = (numeroRecibo: string, fecha: Date): Content => {
  const fechaObj = new Date(fecha);
  const dia = fechaObj.getDate().toString().padStart(2, '0');
  const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
  const ano = fechaObj.getFullYear().toString();

  return {
    columns: [
      {
        stack: [
          {
            text: 'RECIBO OFICIAL DE CAJA SERIE "A"',
            fontSize: 12,
            bold: true,
            color: '#0514E6',
            fillColor: '#e6f2ff',
            alignment: 'center',
            margin: [115, 10, 0, 10],
          },
          {
            columns: [
              {
                stack: [
                  { text: 'DÍA', fontSize: 10, color: '#0514E6' },
                  { text: dia, fontSize: 10, margin: [0, 2, 0, 0] },
                ],
                width: 60,
              },
              {
                stack: [
                  { text: 'MES', fontSize: 10, color: '#0514E6' },
                  { text: mes, fontSize: 10, margin: [0, 2, 0, 0] },
                ],
                width: 60,
              },
              {
                stack: [
                  { text: 'AÑO', fontSize: 10, color: '#0514E6' },
                  { text: ano, fontSize: 10, margin: [0, 2, 0, 0] },
                ],
                width: 80,
              },
            ],
            margin: [0, 10, 0, 0],
          },
        ],
        width: '*',
      },
      {
        stack: [
          {
            text: `No. ${numeroRecibo}`,
            fontSize: 12,
            bold: true,
            color: '#ff0000',
            alignment: 'right',
          },
        ],
        width: 100,
        alignment: 'right',
      },
    ],
    margin: [0, 20, 0, 0],
  };
};

const reciboBody = (data: ReciboData): Content => {
  return {
    stack: [
      {
        stack: [
          {
            text: [
              {
                text: 'Recibí de: ',
                fontSize: 10,
                color: '#0514E6',
                bold: true,
              },
              { text: data.recibidoDe, fontSize: 10, color: '#000000' },
            ],
            margin: [0, 5, 0, 10],
          },
          {
            text: [
              {
                text: 'La cantidad de: ',
                fontSize: 10,
                color: '#0514E6',
                bold: true,
              },
              { text: data.cantidad, fontSize: 10, color: '#000000' },
            ],
            margin: [0, 5, 0, 10],
          },
          {
            text: [
              {
                text: 'En concepto de: ',
                fontSize: 10,
                color: '#0514E6',
                bold: true,
              },
              { text: data.concepto, fontSize: 10, color: '#000000' },
            ],
            margin: [0, 5, 0, 80],
          },
        ],
        margin: [0, 20, 0, 0],
      },
    ],
  };
};

// Footer con firmas
const reciboFooter = (): Content => {
  return {
    columns: [
      {
        stack: [
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 120,
                y2: 0,
                lineWidth: 0.5,
                lineColor: '#0514E6',
              },
            ],
            margin: [135, 0, 0, 0],
          },
          {
            text: 'Entregué Conforme',
            fontSize: 10,
            color: '#0514E6',
            bold: true,
            margin: [150, 5, 0, 3],
          },

          {
            text: '\n',
            fontSize: 10,
          },
        ],
        width: '*',
      },
      {
        stack: [
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 120,
                y2: 0,
                lineWidth: 0.5,
                lineColor: '#0514E6',
              },
            ],
            margin: [130, 0, 0, 0],
          },
          {
            text: 'Recibí Conforme',
            fontSize: 10,
            color: '#0514E6',
            bold: true,
            margin: [150, 5, 0, 3],
          },

          {
            text: '\n',
            fontSize: 10,
          },
        ],
        width: '*',
      },
    ],
    margin: [0, 40, 0, 0],
  };
};

// Función principal que genera el documento completo
export const createReciboDocument = (
  data: ReciboData,
): TDocumentDefinitions => {
  const content: Content[] = [
    headerCompanyInfo(),
    reciboTitle(data.numeroRecibo, data.fecha),
    reciboBody(data),
    reciboFooter(),
    // {
    //   text: 'MC: 1612508540046M AIMP/02/04/0036/2021-9 58. 50J. (2) 2,951-3,200 ACF/2/2356/8-2024 O.T. 3652 (08/24)',
    //   fontSize: 5,
    //   color: '#cccccc',
    //   alignment: 'center',
    //   margin: [0, 20, 0, 0],
    // },
  ];

  return {
    pageSize: 'LETTER',
    pageOrientation: 'landscape',
    pageMargins: [40, 40, 40, 40],
    content,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
    },
  };
};
