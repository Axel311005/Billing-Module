import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateTramiteSeguroDto {
    @ApiProperty({
        description: 'ID del vehículo',
        example: 1,
        nullable: false
    })
    @IsNumber()
    idVehiculo: number;

    @ApiProperty({
        description: 'ID del cliente',
        example: 1,
        nullable: false
    })
    @IsNumber()
    idCliente: number;

    @ApiProperty({
        description: 'ID de la aseguradora',
        example: 1,
        nullable: false
    })
    @IsNumber()
    idAseguradora: number;

    @ApiProperty({
        description: 'Número del trámite de seguro',
        example: 'TRAM-2024-001',
        nullable: false
    })
    @IsString()
    @MinLength(1)
    numeroTramite: string;

    @ApiProperty({
        description: 'Estado del trámite',
        example: 'iniciado',
        default: 'iniciado',
        nullable: false
    })
    @IsString()
    @IsOptional()
    estado?: string;

    @ApiProperty({
        description: 'Fecha de inicio del trámite',
        example: '2024-01-15T08:00:00.000Z',
        nullable: false
    })
    @IsDateString()
    fechaInicio: string;

    @ApiProperty({
        description: 'Fecha de fin del trámite',
        example: '2024-01-20T17:00:00.000Z',
        nullable: true
    })
    @IsDateString()
    @IsOptional()
    fechaFin?: string;

    @ApiProperty({
        description: 'Observaciones del trámite',
        example: 'Trámite iniciado por siniestro',
        nullable: true
    })
    @IsString()
    @IsOptional()
    observaciones?: string;
}
