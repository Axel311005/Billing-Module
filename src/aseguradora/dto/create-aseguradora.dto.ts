import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class CreateAseguradoraDto {
    @ApiProperty({
        description: 'Descripción/nombre de la aseguradora',
        example: 'Seguros del Paraguay S.A.',
        nullable: false
    })
    @IsString()
    @MinLength(1)
    descripcion: string;

    @ApiProperty({
        description: 'Teléfono de contacto de la aseguradora',
        example: '+595 21 123 456',
        nullable: true
    })
    @IsString()
    @IsOptional()
    telefono?: string;

    @ApiProperty({
        description: 'Dirección de la aseguradora',
        example: 'Av. Mariscal López 1234, Asunción',
        nullable: true
    })
    @IsString()
    @IsOptional()
    direccion?: string;

    @ApiProperty({
        description: 'Persona de contacto en la aseguradora',
        example: 'Juan Pérez',
        nullable: true
    })
    @IsString()
    @IsOptional()
    contacto?: string;

    @ApiProperty({
        description: 'Estado activo de la aseguradora',
        example: true,
        default: true
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}
