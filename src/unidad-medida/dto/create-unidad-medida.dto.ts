import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUnidadMedidaDto {
    @ApiProperty({
        description: 'Descripción de la unidad de medida',
        example: 'Kilogramos',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    descripcion: string;

    @ApiProperty({
        description: 'Estado activo de la unidad de medida',
        example: true,
        default: true
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}
