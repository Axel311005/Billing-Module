import { PartialType } from '@nestjs/mapped-types';
import { CreateFacturaLineaDto } from './create-factura-linea.dto';

export class UpdateFacturaLineaDto extends PartialType(CreateFacturaLineaDto) {}
