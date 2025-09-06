import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, MinLength, IsNumber, IsPositive, IsDateString } from "class-validator";

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
        example: 'Laptop Dell Inspiron 15',
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
        example: 5000000.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    precioBaseLocal: number;

    @ApiProperty({
        description: 'Precio base en dólares',
        example: 714.29,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    precioBaseDolar: number;

    @ApiProperty({
        description: 'Precio de adquisición en moneda local',
        example: 4000000.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    precioAdquisicionLocal: number;

    @ApiProperty({
        description: 'Precio de adquisición en dólares',
        example: 571.43,
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
        description: 'Fecha de la última salida del item',
        example: '2024-01-15T10:30:00Z',
        nullable: true
    })
    @IsDateString()
    @IsOptional()
    ultimaSalida?: string;

    @ApiProperty({
        description: 'Fecha del último ingreso del item',
        example: '2024-01-10T14:20:00Z',
        nullable: true
    })
    @IsDateString()
    @IsOptional()
    ultimoIngreso?: string;

    @ApiProperty({
        description: 'Usuario que realizó la última modificación',
        example: 'admin',
        nullable: true
    })
    @IsString()
    @IsOptional()
    usuarioUltModif?: string;

    @ApiProperty({
        description: 'Fecha de la última modificación',
        example: '2024-01-15T16:45:00Z',
        nullable: true
    })
    @IsDateString()
    @IsOptional()
    fechaUltModif?: string;

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
