import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMonedaDto } from './dto/create-moneda.dto';
import { UpdateMonedaDto } from './dto/update-moneda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Moneda } from './entities/moneda.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class MonedaService {

  private readonly logger = new Logger('MonedaService');

  constructor(
    @InjectRepository(Moneda)
    private readonly monedaRepository: Repository<Moneda>
  ){}

  async create(createMonedaDto: CreateMonedaDto) {
    try {
      
      const {...moneda} = createMonedaDto;

      const nuevaMoneda = await this.monedaRepository.create({...moneda})

      await this.monedaRepository.save(nuevaMoneda);
      return {...nuevaMoneda};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const monedas = await this.monedaRepository.find({
      take:limit,
      skip : offset,
    })

    return monedas;
  }

  async findOne(id: number) {
    const moneda = await this.monedaRepository.findOneBy({idMoneda : id});

    if (!moneda) {
      throw new NotFoundException(`La moneda con id ${id} no fue encontrada`);
    }

    return moneda;
  }

  async update(id: number, updateMonedaDto: UpdateMonedaDto) {
    const {...toUpdate} = updateMonedaDto;

    const moneda = await this.monedaRepository.preload({
      idMoneda : id, 
      ...toUpdate
    })

    if (!moneda) {
      throw new NotFoundException(`La moneda con id ${id} no fue encontrada`);
    }

    return this.monedaRepository.save(moneda);

  }

  async remove(id: number) {
    const moneda = await this.findOne(id);
    await this.monedaRepository.remove(moneda!);
  }
}
