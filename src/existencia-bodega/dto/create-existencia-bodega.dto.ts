import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class CreateExistenciaBodegaDto {
    @ApiProperty({
        description: 'ID del item',
        example: 1,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    itemId: number;

    @ApiProperty({
        description: 'ID de la bodega',
        example: 1,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    bodegaId: number;

    @ApiProperty({
        description: 'Cantidad disponible del item en la bodega',
        example: 50.0,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    cantDisponible: number;

    @ApiProperty({
        description: 'Existencia máxima del item en la bodega',
        example: 100.0,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    existenciaMaxima: number;

    @ApiProperty({
        description: 'Existencia mínima del item en la bodega',
        example: 10.0,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    existenciaMinima: number;

    @ApiProperty({
        description: 'Punto de reorden del item en la bodega',
        example: 20.0,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    puntoDeReorden: number;
}
