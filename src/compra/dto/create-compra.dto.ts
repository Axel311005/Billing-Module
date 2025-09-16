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
        nullable: true
    })
    @IsNumber()
    @IsPositive()
    impuestoId: number;

    @ApiProperty({
        description: 'ID de la bodega',
        example: 1,
        nullable: true
    })
    @IsNumber()
    @IsPositive()
    bodegaId : number;

    @ApiProperty({
        description: 'ID del consecutivo',
        example: 1,
        nullable: true
    })
    @IsNumber()
    @IsPositive()
    consecutivoId : number;

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
        description: 'Fecha de anulacion de la compra',
        example: '2024-01-15T10:30:00Z',
        nullable: true
    })
    @IsOptional()
    @IsDateString()
    fechaAnulacion: Date;

    @ApiProperty({
        description: 'Subtotal de la compra',
        example: 1000.00,
        nullable: false
    })
    @IsNumber()
    @Min(0)
    subtotal: number;

    @ApiProperty({
        description: 'Total de impuestos de la compra',
        example: 100.00,
        nullable: true
    })
    @IsNumber()
    @Min(0)
    totalImpuesto: number;


    @ApiProperty({
        description: 'Porcentaje de descuento de la compra',
        example: 10,
        nullable: true
    })
    @IsNumber()
    @Min(0)
    porcentajeDescuento : number

    @ApiProperty({
        description: 'Total de descuentos de la compra',
        example: 0.00,
        nullable: true
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
    @Min(0)
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
