import { PartialType } from '@nestjs/swagger';
import { CreateCompraLineaDto } from './create-compra-linea.dto';

export class UpdateCompraLineaDto extends PartialType(CreateCompraLineaDto) {}
