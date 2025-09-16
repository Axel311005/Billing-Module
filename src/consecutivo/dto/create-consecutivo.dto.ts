import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsOptional, MinLength, Min, Max } from "class-validator";

export class CreateConsecutivoDto {
    @ApiProperty({
        description: 'Descripción del consecutivo',
        example: 'Consecutivo para facturas de venta',
        nullable: false,
        minLength: 1,
        maxLength: 100
    })
    @IsString()
    @MinLength(1)
    descripcion: string;

    @ApiProperty({
        description: 'Indica si el consecutivo está activo',
        example: true,
        default: true
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;

    @ApiProperty({
        description: 'Longitud del número consecutivo',
        example: 6,
        minimum: 1,
        maximum: 20
    })
    @IsNumber()
    @Min(1)
    @Max(20)
    longitud: number;

    @ApiProperty({
        description: 'Tipo de documento para el consecutivo',
        example: 'FACTURA',
        nullable: false,
        minLength: 1,
        maxLength: 20
    })
    @IsString()
    @MinLength(1)
    documento: string;

    @ApiProperty({
        description: 'Máscara para formatear el consecutivo',
        example: 'FAC-{0}',
        nullable: true,
        maxLength: 20
    })
    @IsString()
    @IsOptional()
    mascara?: string;

    @ApiProperty({
        description: 'Valor inicial del consecutivo',
        example: 1,
        minimum: 0
    })
    @IsNumber()
    @Min(0)
    valorInicial: number;

    @ApiProperty({
        description: 'Valor final del consecutivo',
        example: 999999,
        minimum: 1
    })
    @IsNumber()
    @Min(1)
    valorFinal: number;

    @ApiProperty({
        description: 'Último valor utilizado del consecutivo',
        example: 0,
        minimum: 0
    })
    @IsNumber()
    @Min(0)
    ultimoValor: number;
}
