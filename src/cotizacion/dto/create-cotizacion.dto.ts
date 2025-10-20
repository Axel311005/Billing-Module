import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDecimal, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateCotizacionDto {
    @ApiProperty({
        description: 'ID del cliente',
        example: 1,
        nullable: false
    })
    @IsNumber()
    idCliente: number;

    @ApiProperty({
        description: 'Fecha de la cotización',
        example: '2024-01-15T08:00:00.000Z',
        nullable: false
    })
    @IsDateString()
    fecha: string;

    @ApiProperty({
        description: 'Estado de la cotización',
        example: 'pendiente',
        default: 'pendiente',
        nullable: false
    })
    @IsString()
    @IsOptional()
    estado?: string;

    @ApiProperty({
        description: 'Total de la cotización',
        example: 1500.00,
        nullable: true
    })
    @IsDecimal()
    @IsOptional()
    total?: number;

    @ApiProperty({
        description: 'Nombre del cliente',
        example: 'Juan Pérez',
        nullable: false
    })
    @IsString()
    @MinLength(1)
    nombreCliente: string;
}
