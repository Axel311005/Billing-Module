import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateRecepcionSeguimientoDto {
    @ApiProperty({
        description: 'ID de la recepción',
        example: 1,
        nullable: false
    })
    @IsNumber()
    idRecepcion: number;

    @ApiProperty({
        description: 'Fecha del seguimiento',
        example: '2024-01-15T10:00:00.000Z',
        nullable: false
    })
    @IsDateString()
    fecha: string;

    @ApiProperty({
        description: 'Estado del seguimiento',
        example: 'en_proceso',
        nullable: false
    })
    @IsString()
    @MinLength(1)
    estado: string;

    @ApiProperty({
        description: 'Descripción del seguimiento',
        example: 'Se inició el diagnóstico del vehículo',
        nullable: true
    })
    @IsString()
    @IsOptional()
    descripcion?: string;
}




