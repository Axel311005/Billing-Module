import {
  IsOptional,
  IsInt,
  IsString,
  IsBoolean,
  IsDateString,
  Min,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum CompraSortBy {
  FECHA = 'fecha',
  TOTAL = 'total',
  CODIGO = 'codigo_compra',
  BODEGA = 'bodega',
  EMPLEADO = 'empleado',
  TIPO_PAGO = 'tipo_pago',
  MONEDA = 'moneda',
}

export class CompraFilterDto {
  @IsOptional() @IsString() bodegaNombre?: string;
  @IsOptional() @IsString() empleadoNombre?: string;
  @IsOptional() @IsString() tipo_pago?: string;
  @IsOptional() @IsString() moneda?: string;

  @IsOptional() @IsInt() @Type(() => Number) id_bodega?: number;
  @IsOptional() @IsInt() @Type(() => Number) id_empleado?: number;
  @IsOptional() @IsInt() @Type(() => Number) id_tipo_pago?: number;
  @IsOptional() @IsInt() @Type(() => Number) id_moneda?: number;

  @IsOptional() @IsString() codigo_compra?: string;
  @IsOptional() @IsString() codigoLike?: string;

  @IsOptional() @IsString() estado?: string;
  @IsOptional() @Type(() => Boolean) @IsBoolean() anulado?: boolean;

  @IsOptional() @IsDateString() dateFrom?: string;
  @IsOptional() @IsDateString() dateTo?: string;

  @IsOptional() @Type(() => Number) minTotal?: number;
  @IsOptional() @Type(() => Number) maxTotal?: number;

  @IsOptional() @Type(() => Number) @Min(1) page: number = 1;
  @IsOptional() @Type(() => Number) @Min(1) limit: number = 10;

  @IsOptional() @IsEnum(CompraSortBy) sortBy: CompraSortBy = CompraSortBy.FECHA;
  @IsOptional() @IsString() sortDir: 'ASC' | 'DESC' = 'DESC';
}
