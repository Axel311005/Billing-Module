import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateProformaLineasDto {
  @ApiProperty({
    description: 'ID de la proforma',
    example: 1,
    nullable: false,
  })
  @IsNumber()
  idProforma: number;

  @ApiProperty({
    description: 'ID del item',
    example: 1,
    nullable: false,
  })
  @IsNumber()
  idItem: number;

  @ApiProperty({
    description: 'Cantidad del item',
    example: 5.0,
    nullable: false,
  })
  @IsNumber()
  @IsPositive()
  cantidad: number;

  @ApiProperty({
    description: 'Precio unitario del item',
    example: 100.0,
    nullable: false,
  })
  @IsNumber()
  @IsPositive()
  precioUnitario: number;

  @ApiProperty({
    description: 'Total de la línea',
    example: 500.0,
    nullable: false,
  })
  @IsNumber()
  @Min(0)
  totalLinea: number;
}
