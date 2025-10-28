import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNumber } from "class-validator";

export class CreateProformaLineasDto {
    @ApiProperty({
        description: 'ID de la proforma',
        example: 1,
        nullable: false
    })
    @IsNumber()
    idProforma: number;

    @ApiProperty({
        description: 'ID del item',
        example: 1,
        nullable: false
    })
    @IsNumber()
    idItem: number;

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
        description: 'Total de la línea',
        example: 250.00,
        nullable: false
    })
    @IsDecimal()
    totalLinea: number;
}




