import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateDetalleCotizacionDto } from './dto/create-detalle-cotizacion.dto';
import { UpdateDetalleCotizacionDto } from './dto/update-detalle-cotizacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleCotizacion } from './entities/detalle-cotizacion.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class DetalleCotizacionService {

  private readonly logger = new Logger('DetalleCotizacionService');

  constructor(
    @InjectRepository(DetalleCotizacion)
    private readonly detalleCotizacionRepository: Repository<DetalleCotizacion>
  ){}

  async create(createDetalleCotizacionDto: CreateDetalleCotizacionDto) {
    try {
      
      const {...detalleCotizacion} = createDetalleCotizacionDto;

      const nuevoDetalleCotizacion = await this.detalleCotizacionRepository.create({...detalleCotizacion})

      await this.detalleCotizacionRepository.save(nuevoDetalleCotizacion);
      return {...nuevoDetalleCotizacion};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const detalleCotizaciones = await this.detalleCotizacionRepository.find({
      take:limit,
      skip : offset,
      relations: ['item', 'cotizacion']
    })

    return detalleCotizaciones;
  }

  async findOne(id: number) {
    const detalleCotizacion = await this.detalleCotizacionRepository.findOne({
      where: {idDetalleCotizacion : id},
      relations: ['item', 'cotizacion']
    });

    if (!detalleCotizacion) {
      throw new NotFoundException(`El detalle de cotización con id ${id} no fue encontrado`);
    }

    return detalleCotizacion;
  }

  async update(id: number, updateDetalleCotizacionDto: UpdateDetalleCotizacionDto) {
    const {...toUpdate} = updateDetalleCotizacionDto;

    const detalleCotizacion = await this.detalleCotizacionRepository.preload({
      idDetalleCotizacion : id, 
      ...toUpdate
    })

    if (!detalleCotizacion) {
      throw new NotFoundException(`El detalle de cotización con id ${id} no fue encontrado`);
    }

    return this.detalleCotizacionRepository.save(detalleCotizacion);

  }

  async remove(id: number) {
    const detalleCotizacion = await this.findOne(id);
    await this.detalleCotizacionRepository.remove(detalleCotizacion!);
  }
}




