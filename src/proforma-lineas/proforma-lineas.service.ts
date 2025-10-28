import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProformaLineasDto } from './dto/create-proforma-lineas.dto';
import { UpdateProformaLineasDto } from './dto/update-proforma-lineas.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProformaLineas } from './entities/proforma-lineas.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class ProformaLineasService {

  private readonly logger = new Logger('ProformaLineasService');

  constructor(
    @InjectRepository(ProformaLineas)
    private readonly proformaLineasRepository: Repository<ProformaLineas>
  ){}

  async create(createProformaLineasDto: CreateProformaLineasDto) {
    try {
      
      const {...proformaLineas} = createProformaLineasDto;

      const nuevaProformaLineas = await this.proformaLineasRepository.create({...proformaLineas})

      await this.proformaLineasRepository.save(nuevaProformaLineas);
      return {...nuevaProformaLineas};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const proformaLineas = await this.proformaLineasRepository.find({
      take:limit,
      skip : offset,
      relations: ['proforma', 'item']
    })

    return proformaLineas;
  }

  async findOne(id: number) {
    const proformaLineas = await this.proformaLineasRepository.findOne({
      where: {idProformaLineas : id},
      relations: ['proforma', 'item']
    });

    if (!proformaLineas) {
      throw new NotFoundException(`La línea de proforma con id ${id} no fue encontrada`);
    }

    return proformaLineas;
  }

  async update(id: number, updateProformaLineasDto: UpdateProformaLineasDto) {
    const {...toUpdate} = updateProformaLineasDto;

    const proformaLineas = await this.proformaLineasRepository.preload({
      idProformaLineas : id, 
      ...toUpdate
    })

    if (!proformaLineas) {
      throw new NotFoundException(`La línea de proforma con id ${id} no fue encontrada`);
    }

    return this.proformaLineasRepository.save(proformaLineas);

  }

  async remove(id: number) {
    const proformaLineas = await this.findOne(id);
    await this.proformaLineasRepository.remove(proformaLineas!);
  }
}




