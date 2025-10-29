import { PartialType } from '@nestjs/swagger';
import { CreateRecepcionSeguimientoDto } from './create-recepcion-seguimiento.dto';

export class UpdateRecepcionSeguimientoDto extends PartialType(CreateRecepcionSeguimientoDto) {}





