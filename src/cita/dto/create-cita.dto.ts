import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateCitaDto {
    @ApiProperty({
        description: 'ID del cliente',
        example: 1,
        nullable: false
    })
    @IsNumber()
    idCliente: number;

    @ApiProperty({
        description: 'ID del vehículo',
        example: 1,
        nullable: false
    })
    @IsNumber()
    idVehiculo: number;

    @ApiProperty({
        description: 'ID del motivo de la cita',
        example: 1,
        nullable: false
    })
    @IsNumber()
    idMotivoCita: number;

    @ApiProperty({
        description: 'Fecha y hora de inicio de la cita',
        example: '2024-01-15T09:00:00.000Z',
        nullable: false
    })
    @IsDateString()
    fechaInicio: string;

    @ApiProperty({
        description: 'Fecha y hora de fin de la cita',
        example: '2024-01-15T11:00:00.000Z',
        nullable: false
    })
    @IsDateString()
    fechaFin: string;

    @ApiProperty({
        description: 'Estado de la cita',
        example: 'programada',
        default: 'programada',
        nullable: false
    })
    @IsString()
    @IsOptional()
    estado?: string;

    @ApiProperty({
        description: 'Canal por el cual se agendó la cita',
        example: 'web',
        nullable: true
    })
    @IsString()
    @IsOptional()
    canal?: string;
}




