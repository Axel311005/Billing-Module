import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreReportDto } from './create-store-report.dto';

export class UpdateStoreReportDto extends PartialType(CreateStoreReportDto) {}
