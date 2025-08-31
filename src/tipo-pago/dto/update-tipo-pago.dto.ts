import { PartialType } from '@nestjs/swagger';
import { CreateTipoPagoDto } from './create-tipo-pago.dto';

export class UpdateTipoPagoDto extends PartialType(CreateTipoPagoDto) {}
