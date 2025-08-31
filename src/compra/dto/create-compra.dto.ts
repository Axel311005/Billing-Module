import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

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
        example: 'COMP-001-2024',
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
        example: 100000.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    subtotal: number;

    @ApiProperty({
        description: 'Total de impuestos',
        example: 10000.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    totalImpuesto: number;

    @ApiProperty({
        description: 'Total de descuentos',
        example: 0.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    totalDescuento: number;

    @ApiProperty({
        description: 'Total de la compra',
        example: 110000.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    total: number;

    @ApiProperty({
        description: 'Tipo de cambio usado',
        example: 7000.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    tipoCambioUsado: number;

    @ApiProperty({
        description: 'Comentario de la compra',
        example: 'Compra de materiales',
        nullable: true
    })
    @IsString()
    @IsOptional()
    comentario?: string;
}
