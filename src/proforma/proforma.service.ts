import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProformaDto } from './dto/create-proforma.dto';
import { UpdateProformaDto } from './dto/update-proforma.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proforma } from './entities/proforma.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class ProformaService {

  private readonly logger = new Logger('ProformaService');

  constructor(
    @InjectRepository(Proforma)
    private readonly proformaRepository: Repository<Proforma>
  ){}

  async create(createProformaDto: CreateProformaDto) {
    try {
      
      const {...proforma} = createProformaDto;

      const nuevaProforma = await this.proformaRepository.create({...proforma})

      await this.proformaRepository.save(nuevaProforma);
      return {...nuevaProforma};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const proformas = await this.proformaRepository.find({
      take:limit,
      skip : offset,
      relations: ['tramiteSeguro']
    })

    return proformas;
  }

  async findOne(id: number) {
    const proforma = await this.proformaRepository.findOne({
      where: {idProforma : id},
      relations: ['tramiteSeguro']
    });

    if (!proforma) {
      throw new NotFoundException(`La proforma con id ${id} no fue encontrada`);
    }

    return proforma;
  }

  async update(id: number, updateProformaDto: UpdateProformaDto) {
    const {...toUpdate} = updateProformaDto;

    const proforma = await this.proformaRepository.preload({
      idProforma : id, 
      ...toUpdate
    })

    if (!proforma) {
      throw new NotFoundException(`La proforma con id ${id} no fue encontrada`);
    }

    return this.proformaRepository.save(proforma);

  }

  async remove(id: number) {
    const proforma = await this.findOne(id);
    await this.proformaRepository.remove(proforma!);
  }
}
