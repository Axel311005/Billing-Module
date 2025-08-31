import { PartialType } from '@nestjs/swagger';
import { CreateExistenciaBodegaDto } from './create-existencia-bodega.dto';

export class UpdateExistenciaBodegaDto extends PartialType(CreateExistenciaBodegaDto) {}
