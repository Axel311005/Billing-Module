import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDecimal,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProformaDto {
  @ApiProperty({
    description: 'ID del trámite de seguro',
    example: 1,
    nullable: false,
  })
  @IsNumber()
  idTramiteSeguro: number;

  @ApiProperty({
    description: 'ID del consecutivo',
    example: 1,
    nullable: false,
  })
  @IsNumber()
  idConsecutivo: number;

  @ApiProperty({
    description: 'Fecha de la proforma',
    example: '2024-01-15T08:00:00.000Z',
    nullable: false,
  })
  @IsDateString()
  fecha: string;

  // @ApiProperty({
  //     description: 'Estado de la proforma',
  //     example: 'pendiente',
  //     default: 'pendiente',
  //     nullable: false
  // })
  // @IsString()
  // @IsOptional()
  // estado?: string;

  @ApiProperty({
    description: 'Observaciones de la proforma',
    example: 'Proforma para reparación de daños',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  observaciones?: string;

  //   @ApiProperty({
  //     description: 'Total estimado de la proforma',
  //     example: 1500.0,
  //     nullable: true,
  //   })
  //   @IsDecimal()
  //   @IsOptional()
  //   totalEstimado?: number;
}
