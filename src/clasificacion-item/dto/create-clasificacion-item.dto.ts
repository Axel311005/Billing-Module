import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class CreateClasificacionItemDto {
    @ApiProperty({
        description: 'Descripción de la clasificación del item',
        example: 'Electrónicos',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    descripcion: string;

    @ApiProperty({
        description: 'Estado activo de la clasificación',
        example: true,
        default: true
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}
