import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

const toOptionalNumber = ({
  value,
}: {
  value: unknown;
}): number | undefined => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }
  const numeric = Number(value);
  return Number.isNaN(numeric) ? undefined : Math.trunc(numeric);
};

const toOptionalString = ({
  value,
}: {
  value: unknown;
}): string | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length === 0 ? undefined : trimmed;
  }
  return String(value);
};

export class InventoryStockReportFilterDto {
  @IsOptional()
  @Transform(toOptionalNumber)
  @IsInt()
  bodegaId?: number;

  @IsOptional()
  @Transform(toOptionalNumber)
  @IsInt()
  clasificacionId?: number;

  @IsOptional()
  @Transform(toOptionalNumber)
  @IsInt()
  unidadMedidaId?: number;

  @IsOptional()
  @Transform(toOptionalString)
  @IsString()
  @MaxLength(120)
  search?: string;

  @IsOptional()
  @Transform(toOptionalString)
  @IsString()
  @MaxLength(80)
  titulo?: string;

  @IsOptional()
  @Transform(toOptionalString)
  @IsString()
  @MaxLength(80)
  generadoPor?: string;
}
