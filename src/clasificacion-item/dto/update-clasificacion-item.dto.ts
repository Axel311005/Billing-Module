import { PartialType } from '@nestjs/mapped-types';
import { CreateClasificacionItemDto } from './create-clasificacion-item.dto';

export class UpdateClasificacionItemDto extends PartialType(CreateClasificacionItemDto) {}
