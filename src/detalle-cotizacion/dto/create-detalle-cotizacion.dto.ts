import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNumber } from "class-validator";

export class CreateDetalleCotizacionDto {
    @ApiProperty({
        description: 'ID del item',
        example: 1,
        nullable: false
    })
    @IsNumber()
    idItem: number;

    @ApiProperty({
        description: 'ID de la cotización',
        example: 1,
        nullable: false
    })
    @IsNumber()
    idCotizacion: number;

    @ApiProperty({
        description: 'Cantidad del item',
        example: 2.5,
        nullable: false
    })
    @IsDecimal()
    cantidad: number;

    @ApiProperty({
        description: 'Precio unitario del item',
        example: 100.00,
        nullable: false
    })
    @IsDecimal()
    precioUnitario: number;

    @ApiProperty({
        description: 'Total de las líneas',
        example: 250.00,
        nullable: false
    })
    @IsDecimal()
    totalLineas: number;
}
