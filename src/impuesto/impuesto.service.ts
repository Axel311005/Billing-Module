import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateImpuestoDto } from './dto/create-impuesto.dto';
import { UpdateImpuestoDto } from './dto/update-impuesto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Impuesto } from './entities/impuesto.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class ImpuestoService {

  private readonly logger = new Logger('ImpuestoService');

  constructor(
    @InjectRepository(Impuesto)
    private readonly impuestoRepository: Repository<Impuesto>
  ){}

  async create(createImpuestoDto: CreateImpuestoDto) {
    try {
      
      const {...impuesto} = createImpuestoDto;

      const nuevoImpuesto = await this.impuestoRepository.create({...impuesto})

      await this.impuestoRepository.save(nuevoImpuesto);
      return {...nuevoImpuesto};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const impuestos = await this.impuestoRepository.find({
      take:limit,
      skip : offset,
    })

    return impuestos;
  }

  async findOne(id: number) {
    const impuesto = await this.impuestoRepository.findOneBy({idImpuesto : id});

    if (!impuesto) {
      throw new NotFoundException(`El impuesto con id ${id} no fue encontrado`);
    }

    return impuesto;
  }

  async update(id: number, updateImpuestoDto: UpdateImpuestoDto) {
    const {...toUpdate} = updateImpuestoDto;

    const impuesto = await this.impuestoRepository.preload({
      idImpuesto : id, 
      ...toUpdate
    })

    if (!impuesto) {
      throw new NotFoundException(`El impuesto con id ${id} no fue encontrado`);
    }

    return this.impuestoRepository.save(impuesto);

  }

  async remove(id: number) {
    const impuesto = await this.findOne(id);
    await this.impuestoRepository.remove(impuesto!);
  }
}
