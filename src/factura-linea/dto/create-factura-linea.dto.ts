import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, Min } from "class-validator";

export class CreateFacturaLineaDto {
    @ApiProperty({
        description: 'ID de la factura',
        example: 1,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    facturaId: number;

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
        example: 5.0,
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
        example: 500.00,
        nullable: false
    })
    @IsNumber()
    @Min(0)
    totalLinea: number;
}
