import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, MinLength, IsNumber, IsPositive } from "class-validator";

export class CreateMonedaDto {
    @ApiProperty({
        description: 'Descripción de la moneda',
        example: 'Dólar Estadounidense',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    descripcion: string;

    @ApiProperty({
        description: 'Tipo de cambio de la moneda',
        example: 7000.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    tipoCambio: number;

    @ApiProperty({
        description: 'Estado activo de la moneda',
        example: true,
        default: true
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}
