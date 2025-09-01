import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTipoPagoDto } from './dto/create-tipo-pago.dto';
import { UpdateTipoPagoDto } from './dto/update-tipo-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoPago } from './entities/tipo-pago.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class TipoPagoService {

  private readonly logger = new Logger('TipoPagoService');

  constructor(
    @InjectRepository(TipoPago)
    private readonly tipoPagoRepository: Repository<TipoPago>
  ){}

  async create(createTipoPagoDto: CreateTipoPagoDto) {
    try {
      
      const {...tipoPago} = createTipoPagoDto;

      const nuevoTipoPago = await this.tipoPagoRepository.create({...tipoPago})

      await this.tipoPagoRepository.save(nuevoTipoPago);
      return {...nuevoTipoPago};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const tiposPago = await this.tipoPagoRepository.find({
      take:limit,
      skip : offset,
    })

    return tiposPago;
  }

  async findOne(id: number) {
    const tipoPago = await this.tipoPagoRepository.findOneBy({idTipoPago : id});

    if (!tipoPago) {
      throw new NotFoundException(`El tipo de pago con id ${id} no fue encontrado`);
    }

    return tipoPago;
  }

  async update(id: number, updateTipoPagoDto: UpdateTipoPagoDto) {
    const {...toUpdate} = updateTipoPagoDto;

    const tipoPago = await this.tipoPagoRepository.preload({
      idTipoPago : id, 
      ...toUpdate
    })

    if (!tipoPago) {
      throw new NotFoundException(`El tipo de pago con id ${id} no fue encontrado`);
    }

    return this.tipoPagoRepository.save(tipoPago);

  }

  async remove(id: number) {
    const tipoPago = await this.findOne(id);
    await this.tipoPagoRepository.remove(tipoPago!);
  }
}
