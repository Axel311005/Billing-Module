import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateClienteDto {

    @ApiProperty({
        description: 'Nombre del cliente',
        example: 'Empresa ABC S.A.',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    nombre: string;

    @ApiProperty({
        description: 'RUC del cliente',
        example: '12345678-9',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    ruc: string;

    @ApiProperty({
        description: 'Indica si el cliente está exonerado de impuestos',
        example: false,
        default: false
    })
    @IsBoolean()
    @IsOptional()
    esExonerado?: boolean;

    @ApiProperty({
        description: 'Porcentaje de exoneración',
        example: 0.0,
        nullable: true
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    porcentajeExonerado?: number;

    @ApiProperty({
        description: 'Dirección del cliente',
        example: 'Av. Principal 123, Ciudad',
        nullable: true
    })
    @IsString()
    @IsOptional()
    direccion?: string;

    @ApiProperty({
        description: 'Teléfono del cliente',
        example: '+505 83895193',
        nullable: true
    })
    @IsString()
    @IsOptional()
    telefono?: string;

    @ApiProperty({
        description: 'Estado activo del cliente',
        example: true,
        default: true
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;

    @ApiProperty({
        description: 'Notas adicionales sobre el cliente',
        example: 'Cliente preferencial',
        nullable: true
    })
    @IsString()
    @IsOptional()
    notas?: string;
}
