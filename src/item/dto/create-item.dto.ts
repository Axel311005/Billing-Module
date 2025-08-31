import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateItemDto {
    
    @ApiProperty({
        description: 'ID de la clasificación del item',
        example: 1,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    clasificacionId: number;

    @ApiProperty({
        description: 'ID de la unidad de medida',
        example: 1,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    unidadMedidaId: number;

    @ApiProperty({
        description: 'Código del item',
        example: 'ITEM-001',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    codigoItem: string;

    @ApiProperty({
        description: 'Descripción del item',
        example: 'Producto de ejemplo',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    descripcion: string;

    @ApiProperty({
        description: 'Tipo de item',
        example: 'PRODUCTO',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    tipo: string;

    @ApiProperty({
        description: 'Precio base en moneda local',
        example: 100000.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    precioBaseLocal: number;

    @ApiProperty({
        description: 'Precio base en dólares',
        example: 15.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    precioBaseDolar: number;

    @ApiProperty({
        description: 'Precio de adquisición en moneda local',
        example: 80000.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    precioAdquisicionLocal: number;

    @ApiProperty({
        description: 'Precio de adquisición en dólares',
        example: 12.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    precioAdquisicionDolar: number;

    @ApiProperty({
        description: 'Indica si el item es cotizable',
        example: true,
        default: false
    })
    @IsBoolean()
    @IsOptional()
    esCotizable?: boolean;

    @ApiProperty({
        description: 'Indica si el item es perecedero',
        example: false,
        default: false
    })
    @IsBoolean()
    @IsOptional()
    perecedero?: boolean;

    @ApiProperty({
        description: 'Estado activo del item',
        example: true,
        default: true
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}
