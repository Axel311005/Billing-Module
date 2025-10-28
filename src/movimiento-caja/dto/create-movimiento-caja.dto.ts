import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDecimal, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateMovimientoCajaDto {
    @ApiProperty({
        description: 'ID de la caja',
        example: 1,
        nullable: false
    })
    @IsNumber()
    idCaja: number;

    @ApiProperty({
        description: 'Tipo de movimiento (ingreso/egreso)',
        example: 'ingreso',
        nullable: false
    })
    @IsString()
    @MinLength(1)
    tipo: string;

    @ApiProperty({
        description: 'Monto del movimiento',
        example: 100.00,
        nullable: false
    })
    @IsDecimal()
    monto: number;

    @ApiProperty({
        description: 'Descripción del movimiento',
        example: 'Venta de repuestos',
        nullable: true
    })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        description: 'Fecha del movimiento',
        example: '2024-01-15T10:30:00.000Z',
        nullable: false
    })
    @IsDateString()
    fecha: string;

    @ApiProperty({
        description: 'ID de referencia del movimiento',
        example: 123,
        nullable: true
    })
    @IsNumber()
    @IsOptional()
    idReferencia?: number;

    @ApiProperty({
        description: 'Tipo de referencia del movimiento',
        example: 'factura',
        nullable: true
    })
    @IsString()
    @IsOptional()
    tipoReferencia?: string;
}

