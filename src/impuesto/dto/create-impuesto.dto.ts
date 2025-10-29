import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MinLength,
  IsNumber,
  IsPositive,
  Min,
} from 'class-validator';

export class CreateImpuestoDto {
  @ApiProperty({
    description: 'Descripción del impuesto',
    example: 'IVA 10%',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  descripcion: string;

  @ApiProperty({
    description: 'Porcentaje del impuesto',
    example: 10.0,
    nullable: false,
  })
  @IsNumber()
  @Min(0)
  porcentaje: number;

  @ApiProperty({
    description: 'Estado activo del impuesto',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
