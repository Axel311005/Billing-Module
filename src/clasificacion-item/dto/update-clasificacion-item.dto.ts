import { PartialType } from '@nestjs/swagger';
import { CreateClasificacionItemDto } from './create-clasificacion-item.dto';

export class UpdateClasificacionItemDto extends PartialType(CreateClasificacionItemDto) {}
