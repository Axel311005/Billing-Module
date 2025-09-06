import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, MinLength, IsNumber, IsPositive, IsDateString, Min } from "class-validator";

export class CreateFacturaDto {
    @ApiProperty({
        description: 'ID del cliente',
        example: 1,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    clienteId: number;

    @ApiProperty({
        description: 'ID del tipo de pago',
        example: 1,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    tipoPagoId: number;

    @ApiProperty({
        description: 'ID de la moneda',
        example: 1,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    monedaId: number;

    @ApiProperty({
        description: 'ID del impuesto',
        example: 1,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    impuestoId: number;

    @ApiProperty({
        description: 'Código de la factura',
        example: 'FAC-2024-001',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    codigoFactura: string;

    @ApiProperty({
        description: 'Fecha de la factura',
        example: '2024-01-15T10:30:00Z',
        nullable: false
    })
    @IsDateString()
    fecha: string;

    @ApiProperty({
        description: 'Indica si la factura está anulada',
        example: false,
        default: false
    })
    @IsBoolean()
    @IsOptional()
    anulada?: boolean;

    @ApiProperty({
        description: 'Estado de la factura',
        example: 'PENDIENTE',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    estado: string;

    @ApiProperty({
        description: 'Subtotal de la factura',
        example: 1000.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    subtotal: number;

    @ApiProperty({
        description: 'Total de descuentos de la factura',
        example: 0.00,
        nullable: false
    })

    @IsNumber()
    @Min(0)
    totalDescuento: number;

    @ApiProperty({
        description: 'Total de impuestos de la factura',
        example: 100.00,
        nullable: false
    })
    @IsNumber()
    @Min(0)
    totalImpuesto: number;

    @ApiProperty({
        description: 'Total de la factura',
        example: 1100.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    total: number;

    @ApiProperty({
        description: 'Tipo de cambio usado en la factura',
        example: 7000.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    tipoCambioUsado: number;

    @ApiProperty({
        description: 'Comentario adicional de la factura',
        example: 'Factura por servicios prestados',
        nullable: true
    })
    @IsString()
    @IsOptional()
    comentario?: string;
}
