import { PartialType } from '@nestjs/swagger';
import { CreateProformaLineasDto } from './create-proforma-lineas.dto';

export class UpdateProformaLineasDto extends PartialType(CreateProformaLineasDto) {}




