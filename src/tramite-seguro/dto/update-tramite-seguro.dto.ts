import { PartialType } from '@nestjs/swagger';
import { CreateTramiteSeguroDto } from './create-tramite-seguro.dto';

export class UpdateTramiteSeguroDto extends PartialType(CreateTramiteSeguroDto) {}




