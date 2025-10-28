# Sistema de Generación de Recibos PDF

## Descripción

Sistema completo para generar recibos en formato PDF basado en facturas, utilizando pdfmake. El recibo sigue el diseño exacto del recibo físico de **MOTO SERVICIOS TERRY**.

## Estructura del Sistema

### Archivos Creados

1. **`src/reports/recibo.report.ts`**
   - Define la interfaz `ReciboData` para los datos del recibo
   - Contiene las funciones que generan las secciones del PDF:
     - `headerCompanyInfo()`: Encabezado con logo y datos de la empresa
     - `reciboTitle()`: Título "RECIBO OFICIAL DE CAJA SERIE A" y número
     - `reciboBody()`: Campos principales (Recibí de, cantidad, concepto)
     - `reciboFooter()`: Firmas (Entregué/Recibí Conforme)
   - Función principal `createReciboDocument()` que genera el documento

2. **`src/reports/recibo-report.service.ts`**
   - Servicio que maneja la generación de PDFs
   - Métodos:
     - `generateReciboPDF()`: Genera y envía el PDF vía HTTP
     - `createReciboBuffer()`: Crea el PDF como Buffer (útil para email o almacenamiento)

3. **`src/reports/index.ts`**
   - Archivo de exportaciones para facilitar el uso

### Archivos Modificados

1. **`src/factura/factura.module.ts`**
   - Importa `PrinterModule` y añade `ReciboReportService` como provider

2. **`src/factura/factura.controller.ts`**
   - Añadido endpoint `GET /factura/:id/recibo-pdf`
   - Integra la generación del recibo basado en datos de factura

## Diseño del Recibo

El PDF generado incluye:

### 1. Encabezado
- Logo de la empresa (`src/assets/logo-mts.jpeg`)
- **MOTO SERVICIOS TERRY** (azul #0040ff, negrita, 24px)
- **TERRY RODRIGUEZ & CIA, LTDA.**
- Descripción de servicios
- RUC: J0910000261625
- Dirección completa
- Teléfono y celular

### 2. Título del Recibo
- **"RECIBO OFICIAL DE CAJA SERIE A"** (azul claro #e6f2ff, 12px)
- Fecha: DÍA, MES, AÑO en campos separados
- Número de recibo en **rojo** (#ff0000, 24px, negrita)

### 3. Cuerpo
- **Recibí de:** + línea + nombre del cliente
- **La cantidad de:** + línea + monto y moneda
- **En concepto de:** + línea + descripción del pago

### 4. Firmas
- **Entregué Conforme** (con línea para firma)
- **Recibí Conforme** (con línea para firma)

### 5. Texto Legal
- Código legal impreso en gris claro al final

## Uso del Sistema

### Endpoint Principal

```
GET /factura/:id/recibo-pdf
```

Genera y descarga el PDF del recibo para la factura especificada.

### Ejemplo de Uso

```bash
# Obtener el recibo de la factura con id 1
GET http://localhost:3000/factura/1/recibo-pdf
```

### Ejemplo con cURL

```bash
curl -X GET "http://localhost:3000/factura/1/recibo-pdf" \
  --output recibo.pdf \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ejemplo en el Navegador

Simplemente accede a la URL:
```
http://localhost:3000/factura/1/recibo-pdf
```

El navegador descargará automáticamente el PDF.

## Datos del Recibo

El recibo se genera automáticamente con los siguientes datos de la factura:

- **Número de Recibo**: `factura.codigoFactura`
- **Fecha**: `factura.fecha` (formato día, mes, año)
- **Recibí de**: `factura.cliente.nombre`
- **Cantidad**: `factura.total + factura.moneda.descripcion` (ej: "150.00 Córdobas")
- **Concepto**: "Pago de factura {codigoFactura}"
- **Empleado**: Opcionalmente, el nombre del empleado asociado

## Estructura de Datos

```typescript
interface ReciboData {
  numeroRecibo: string;      // Ej: "FACT-0001"
  fecha: Date;              // Fecha de la factura
  recibidoDe: string;       // Nombre del cliente
  cantidad: string;         // "150.00 Córdobas"
  concepto: string;         // "Pago de factura FACT-0001"
  empleado?: string;        // "Juan Pérez" (opcional)
}
```

## Ejemplo de Uso Programático

Si deseas usar el servicio directamente en tu código:

```typescript
import { ReciboReportService } from 'src/reports';

@Injectable()
export class MiServicio {
  constructor(
    private readonly reciboReportService: ReciboReportService,
  ) {}

  async generarRecibo(facturaId: number, response: Response) {
    const factura = await this.facturaService.findOne(facturaId);

    const reciboData = {
      numeroRecibo: factura.codigoFactura,
      fecha: factura.fecha,
      recibidoDe: factura.cliente.nombre,
      cantidad: `${factura.total} ${factura.moneda.descripcion}`,
      concepto: `Pago de factura ${factura.codigoFactura}`,
      empleado: factura.empleado 
        ? `${factura.empleado.primerNombre} ${factura.empleado.primerApellido}`
        : undefined,
    };

    await this.reciboReportService.generateReciboPDF(reciboData, response);
  }
}
```

## Personalización

### Cambiar Información de la Empresa

Edita el objeto `companyInfo` en `src/reports/recibo.report.ts`:

```typescript
const companyInfo = {
  nombre: 'TU EMPRESA',
  nombreLegal: 'RAZÓN SOCIAL LEGAL',
  servicios: 'Descripción de servicios',
  ruc: 'TUNRUC',
  direccion: 'Tu dirección',
  direccion2: 'Dirección adicional',
  telefono: 'Tel.: XXXX-XXXX',
  celular: 'Cel.: XXXX-XXXX',
};
```

### Cambiar Logo

Coloca tu logo en `src/assets/` y actualiza la ruta en el archivo:
- El logo debe ser JPEG, PNG, o SVG
- Tamaño recomendado: 70x70 píxeles

### Modificar Colores

Los colores se definen en hexadecimal:
- Azul principal: `#0040ff`
- Azul claro (fondo): `#e6f2ff`
- Rojo (número recibo): `#ff0000`
- Gris (texto legal): `#cccccc`

Edítalos directamente en el código según tus necesidades.

## Dependencias

El sistema utiliza:
- **pdfmake**: Para generación de PDFs
- **TypeScript**: Lenguaje de programación
- **NestJS**: Framework
- **TypeORM**: ORM

## Flujo de Datos

1. El cliente solicita el recibo: `GET /factura/:id/recibo-pdf`
2. El controller obtiene la factura completa (con relaciones)
3. Se construye el objeto `ReciboData` con datos de la factura
4. `ReciboReportService` llama a `createReciboDocument()`
5. Se genera el PDF con pdfmake
6. El PDF se envía como respuesta HTTP
7. El navegador descarga el archivo

## Pruebas

Para probar el sistema:

1. Asegúrate de tener facturas en tu base de datos
2. Ejecuta el servidor: `npm run start:dev`
3. Accede a: `http://localhost:3000/factura/:id/recibo-pdf`
4. El PDF se descargará automáticamente

## Notas Técnicas

- El tamaño de página es **LETTER** (carta estándar)
- Orientación: **portrait** (vertical)
- Márgenes: 40 puntos en todos los lados
- Las fuentes utilizadas son Roboto (configuradas en `PrinterService`)

## Troubleshooting

### El PDF no se genera

- Verifica que la factura exista con las relaciones necesarias
- Revisa los logs del servidor para errores
- Asegúrate de que el logo existe en `src/assets/logo-mts.jpeg`

### El PDF se genera pero está vacío

- Verifica que la factura tenga `cliente` y `moneda` cargados
- Comprueba que los datos estén correctamente relacionados

### Error de importación

- Ejecuta `npm install` para reinstalar dependencias
- Verifica que `pdfmake` esté instalado correctamente

## Integraciones Futuras

Este sistema puede ser extendido para:

- **Envío por email**: Usar `createReciboBuffer()` para obtener el PDF y enviarlo
- **Almacenamiento**: Guardar los PDFs en servidor o nube
- **Impresión directa**: Integrar con sistemas de impresión
- **Firma digital**: Añadir firmas electrónicas a los PDFs

## Soporte

Para más información sobre la estructura del proyecto:
- Ver `src/printer/printer.service.ts` para configuración de PDFs
- Ver `src/reports/sections/` para otros componentes de reportes
- Consultar documentación de pdfmake: https://pdfmake.github.io/docs/

