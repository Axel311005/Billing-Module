import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

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
        example: 15000.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    precioUnitario: number;

    @ApiProperty({
        description: 'Total de la línea',
        example: 150000.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    totalLinea: number;
}
