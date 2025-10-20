import { PartialType } from '@nestjs/swagger';
import { CreateDetalleCotizacionDto } from './create-detalle-cotizacion.dto';

export class UpdateDetalleCotizacionDto extends PartialType(CreateDetalleCotizacionDto) {}
