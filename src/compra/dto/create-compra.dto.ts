import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, MinLength, IsNumber, IsPositive, IsDateString, Min } from "class-validator";

export class CreateCompraDto {
    @ApiProperty({
        description: 'ID de la moneda',
        example: 1,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    monedaId: number;

    @ApiProperty({
        description: 'ID del tipo de pago',
        example: 1,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    tipoPagoId: number;

    @ApiProperty({
        description: 'ID del impuesto',
        example: 1,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    impuestoId: number;

    @ApiProperty({
        description: 'Código de la compra',
        example: 'COMP-2024-001',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    codigoCompra: string;

    @ApiProperty({
        description: 'Estado de la compra',
        example: 'PENDIENTE',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    estado: string;

    @ApiProperty({
        description: 'Indica si la compra está anulada',
        example: false,
        default: false
    })
    @IsBoolean()
    @IsOptional()
    anulado?: boolean;

    @ApiProperty({
        description: 'Subtotal de la compra',
        example: 1000.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    subtotal: number;

    @ApiProperty({
        description: 'Total de impuestos de la compra',
        example: 100.00,
        nullable: false
    })
    @IsNumber()
    @Min(0)
    totalImpuesto: number;

    @ApiProperty({
        description: 'Total de descuentos de la compra',
        example: 0.00,
        nullable: false
    })
    @IsNumber()
    @Min(0)
    totalDescuento: number;

    @ApiProperty({
        description: 'Total de la compra',
        example: 1100.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    total: number;

    @ApiProperty({
        description: 'Tipo de cambio usado en la compra',
        example: 7000.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    tipoCambioUsado: number;

    @ApiProperty({
        description: 'Comentario adicional de la compra',
        example: 'Compra de materiales para producción',
        nullable: true
    })
    @IsString()
    @IsOptional()
    comentario?: string;
}
