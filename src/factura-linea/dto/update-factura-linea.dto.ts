import { PartialType } from '@nestjs/swagger';
import { CreateFacturaLineaDto } from './create-factura-linea.dto';

export class UpdateFacturaLineaDto extends PartialType(CreateFacturaLineaDto) {}
