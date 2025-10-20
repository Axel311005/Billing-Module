import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateRecepcionDto {
    @ApiProperty({
        description: 'ID del vehículo',
        example: 1,
        nullable: false
    })
    @IsNumber()
    idVehiculo: number;

    @ApiProperty({
        description: 'ID del empleado que recibe',
        example: 1,
        nullable: false
    })
    @IsNumber()
    idEmpleado: number;

    @ApiProperty({
        description: 'Fecha de recepción del vehículo',
        example: '2024-01-15T08:00:00.000Z',
        nullable: false
    })
    @IsDateString()
    fechaRecepcion: string;

    @ApiProperty({
        description: 'Observaciones sobre la recepción',
        example: 'Vehículo con daños menores en el guardabarros',
        nullable: true
    })
    @IsString()
    @IsOptional()
    observaciones?: string;

    @ApiProperty({
        description: 'Estado de la recepción',
        example: 'recibido',
        default: 'recibido',
        nullable: false
    })
    @IsString()
    @IsOptional()
    estado?: string;

    @ApiProperty({
        description: 'Código único de la recepción',
        example: 'REC-2024-001',
        nullable: false
    })
    @IsString()
    @MinLength(1)
    codigoRecepcion: string;

    @ApiProperty({
        description: 'Fecha estimada de entrega',
        example: '2024-01-20T17:00:00.000Z',
        nullable: true
    })
    @IsDateString()
    @IsOptional()
    fechaEntregaEstimada?: string;

    @ApiProperty({
        description: 'Fecha real de entrega',
        example: '2024-01-20T16:30:00.000Z',
        nullable: true
    })
    @IsDateString()
    @IsOptional()
    fechaEntregaReal?: string;
}
