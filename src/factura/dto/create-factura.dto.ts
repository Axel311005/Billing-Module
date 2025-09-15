import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, MinLength, IsNumber, IsPositive, IsDateString, Min, IsDate } from "class-validator";

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
        description: 'Código de la factura',
        example: 'FAC-2024-001',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    codigoFactura: string;

    

    @ApiProperty({
        description: 'Indica si la factura está anulada',
        example: false,
        default: false
    })
    @IsBoolean()
    @IsOptional()
    anulada?: boolean;

    // @ApiProperty({
    //     description: 'Fecha de anulacion de la factura',
    //     example: '2024-01-15T10:30:00Z',
    //     nullable: true
    // })
    // @IsOptional()
    // @IsDateString()
    // fechaAnulacion?: Date;


    @ApiProperty({
        description: 'Estado de la factura',
        example: 'PENDIENTE',
        nullable: false,
        minLength: 1
    })
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
        description: 'Porcentaje de descuento aplicable a la factura',
        example: 10,
        nullable: true
    })
    @IsNumber()
    @Min(0)
    porcentajeDescuento: number;

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
