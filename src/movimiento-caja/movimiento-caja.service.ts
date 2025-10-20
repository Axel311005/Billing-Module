import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMovimientoCajaDto } from './dto/create-movimiento-caja.dto';
import { UpdateMovimientoCajaDto } from './dto/update-movimiento-caja.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovimientoCaja } from './entities/movimiento-caja.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class MovimientoCajaService {

  private readonly logger = new Logger('MovimientoCajaService');

  constructor(
    @InjectRepository(MovimientoCaja)
    private readonly movimientoCajaRepository: Repository<MovimientoCaja>
  ){}

  async create(createMovimientoCajaDto: CreateMovimientoCajaDto) {
    try {
      
      const {...movimientoCaja} = createMovimientoCajaDto;

      const nuevoMovimientoCaja = await this.movimientoCajaRepository.create({...movimientoCaja})

      await this.movimientoCajaRepository.save(nuevoMovimientoCaja);
      return {...nuevoMovimientoCaja};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const movimientosCaja = await this.movimientoCajaRepository.find({
      take:limit,
      skip : offset,
      relations: ['caja']
    })

    return movimientosCaja;
  }

  async findOne(id: number) {
    const movimientoCaja = await this.movimientoCajaRepository.findOne({
      where: {idMovimientoCaja : id},
      relations: ['caja']
    });

    if (!movimientoCaja) {
      throw new NotFoundException(`El movimiento de caja con id ${id} no fue encontrado`);
    }

    return movimientoCaja;
  }

  async update(id: number, updateMovimientoCajaDto: UpdateMovimientoCajaDto) {
    const {...toUpdate} = updateMovimientoCajaDto;

    const movimientoCaja = await this.movimientoCajaRepository.preload({
      idMovimientoCaja : id, 
      ...toUpdate
    })

    if (!movimientoCaja) {
      throw new NotFoundException(`El movimiento de caja con id ${id} no fue encontrado`);
    }

    return this.movimientoCajaRepository.save(movimientoCaja);

  }

  async remove(id: number) {
    const movimientoCaja = await this.findOne(id);
    await this.movimientoCajaRepository.remove(movimientoCaja!);
  }
}
