import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, MinLength, IsInt, Min, Max } from "class-validator";

export class CreateVehiculoDto {
    @ApiProperty({
        description: 'ID del cliente propietario del vehículo',
        example: 1,
        nullable: false
    })
    @IsNumber()
    idCliente: number;

    @ApiProperty({
        description: 'Placa del vehículo',
        example: 'ABC-123',
        nullable: false
    })
    @IsString()
    @MinLength(1)
    placa: string;

    @ApiProperty({
        description: 'Número de motor del vehículo',
        example: 'MOT123456',
        nullable: true
    })
    @IsString()
    @IsOptional()
    motor?: string;

    @ApiProperty({
        description: 'Marca del vehículo',
        example: 'Honda',
        nullable: false
    })
    @IsString()
    @MinLength(1)
    marca: string;

    @ApiProperty({
        description: 'Año del vehículo',
        example: 2020,
        nullable: false
    })
    @IsInt()
    @Min(1900)
    @Max(2030)
    anio: number;

    @ApiProperty({
        description: 'Modelo del vehículo',
        example: 'CBR 600',
        nullable: false
    })
    @IsString()
    @MinLength(1)
    modelo: string;

    @ApiProperty({
        description: 'Color del vehículo',
        example: 'Rojo',
        nullable: true
    })
    @IsString()
    @IsOptional()
    color?: string;

    @ApiProperty({
        description: 'Número de chasis del vehículo',
        example: 'CHS123456789',
        nullable: true
    })
    @IsString()
    @IsOptional()
    numChasis?: string;
}
