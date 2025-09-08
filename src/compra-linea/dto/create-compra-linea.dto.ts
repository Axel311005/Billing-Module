import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, Min } from "class-validator";

export class CreateCompraLineaDto {
    @ApiProperty({
        description: 'ID de la compra',
        example: 1,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    compraId: number;

    @ApiProperty({
        description: 'ID del item',
        example: 1,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    itemId: number;

    @ApiProperty({
        description: 'Cantidad del item',
        example: 10.0,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    cantidad: number;

    @ApiProperty({
        description: 'Precio unitario del item',
        example: 100.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    precioUnitario: number;

    @ApiProperty({
        description: 'Total de la línea',
        example: 1000.00,
        nullable: false
    })
    @IsNumber()
    @Min(0)
    totalLinea: number;
}
