import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  MinLength,
  IsNumber,
  IsPositive,
  Min,
  IsInt,
} from 'class-validator';

export class CreateFacturaDto {
  @ApiProperty({ description: 'ID del cliente', example: 1 })
  @IsInt()
  @IsPositive()
  clienteId: number;

  @ApiProperty({ description: 'ID del tipo de pago', example: 1 })
  @IsInt()
  @IsPositive()
  tipoPagoId: number;

  @ApiProperty({ description: 'ID de la moneda', example: 1 })
  @IsInt()
  @IsPositive()
  monedaId: number;

  @ApiProperty({ description: 'ID del impuesto', example: 1, required: false })
  @IsInt()
  @IsPositive()
  @IsOptional()
  impuestoId?: number;

  @ApiProperty({ description: 'ID de la bodega', example: 1, required: false })
  @IsInt()
  @IsPositive()
  @IsOptional()
  bodegaId?: number;

  @ApiProperty({ description: 'ID del consecutivo', example: 1 })
  @IsInt()
  @IsPositive()
  consecutivoId: number;

  @ApiProperty({ description: 'ID del empleado responsable', example: 5 })
  @IsInt()
  @IsPositive()
  empleadoId: number;

  // codigoFactura se genera desde backend (consecutivo), no se solicita en create

  // anulada no se establece en creación

  // @ApiProperty({
  //     description: 'Fecha de anulacion de la factura',
  //     example: '2024-01-15T10:30:00Z',
  //     nullable: true
  // })
  // @IsOptional()
  // @IsDateString()
  // fechaAnulacion?: Date;

  @ApiProperty({ description: 'Estado de la factura', example: 'PENDIENTE' })
  @IsString()
  @MinLength(1)
  estado: string;

  // @ApiProperty({
  //     description: 'Subtotal de la factura',
  //     example: 1000.00,
  //     nullable: false
  // })
  // @IsNumber()
  // @Min(0)
  // subtotal: number;

  @ApiProperty({
    description: 'Porcentaje de descuento',
    example: 10,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  porcentajeDescuento?: number;

  // @ApiProperty({
  //     description: 'Total de descuentos de la factura',
  //     example: 0.00,
  //     nullable: false
  // })
  // @IsNumber()
  // @Min(0)
  // totalDescuento: number;

  // @ApiProperty({
  //     description: 'Total de impuestos de la factura',
  //     example: 100.00,
  //     nullable: false
  // })
  // @IsNumber()
  // @Min(0)
  // totalImpuesto: number;

  // @ApiProperty({
  //     description: 'Total de la factura',
  //     example: 1100.00,
  //     nullable: false
  // })
  // @IsNumber()
  // @Min(0)
  // total: number;

  @ApiProperty({
    description: 'Tipo de cambio usado',
    example: 7000.0,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  tipoCambioUsado?: number; // se sobreescribe tomando la moneda

  @ApiProperty({
    description: 'Comentario',
    example: 'Factura por servicios',
    required: false,
  })
  @IsString()
  @IsOptional()
  comentario?: string;
}
