import { PartialType } from '@nestjs/mapped-types';
import { CreateCompraLineaDto } from './create-compra-linea.dto';

export class UpdateCompraLineaDto extends PartialType(CreateCompraLineaDto) {}
