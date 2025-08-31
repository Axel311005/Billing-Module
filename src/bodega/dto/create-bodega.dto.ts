import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class CreateBodegaDto {
    @ApiProperty({
        description: 'Descripción de la bodega',
        example: 'Bodega Principal',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    descripcion: string;

    @ApiProperty({
        description: 'Estado activo de la bodega',
        example: true,
        default: true
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;  
}
