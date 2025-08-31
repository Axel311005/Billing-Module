import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

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
        example: 20000.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    precioUnitario: number;

    @ApiProperty({
        description: 'Total de la línea',
        example: 100000.00,
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    totalLinea: number;
}
