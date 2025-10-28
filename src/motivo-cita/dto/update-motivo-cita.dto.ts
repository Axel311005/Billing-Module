import { PartialType } from '@nestjs/swagger';
import { CreateMotivoCitaDto } from './create-motivo-cita.dto';

export class UpdateMotivoCitaDto extends PartialType(CreateMotivoCitaDto) {}




