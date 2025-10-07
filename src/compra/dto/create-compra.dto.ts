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

export class CreateCompraDto {
  @ApiProperty({ description: 'ID de la moneda', example: 1 })
  @IsInt()
  @IsPositive()
  monedaId: number;

  @ApiProperty({ description: 'ID del tipo de pago', example: 1 })
  @IsInt()
  @IsPositive()
  tipoPagoId: number;

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

  @ApiProperty({ description: 'ID del empleado responsable', example: 3 })
  @IsInt()
  @IsPositive()
  empleadoId: number;

  // codigoCompra se genera en backend (consecutivo)

  @ApiProperty({ description: 'Estado de la compra', example: 'PENDIENTE' })
  @IsString()
  @MinLength(1)
  estado: string;

  // anulado se maneja mediante endpoint de anulación, no en create

  // fechaAnulacion no se provee en create

  // subtotal se calcula desde líneas

  // totalImpuesto se calcula

  @ApiProperty({
    description: 'Porcentaje de descuento',
    example: 10,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  porcentajeDescuento?: number;

  // totalDescuento se calcula

  // total final se calcula

  @ApiProperty({
    description: 'Tipo de cambio usado',
    example: 7000.0,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  tipoCambioUsado?: number;

  @ApiProperty({
    description: 'Comentario',
    example: 'Compra de insumos',
    required: false,
  })
  @IsString()
  @IsOptional()
  comentario?: string;
}
