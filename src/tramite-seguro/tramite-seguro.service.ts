import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTramiteSeguroDto } from './dto/create-tramite-seguro.dto';
import { UpdateTramiteSeguroDto } from './dto/update-tramite-seguro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TramiteSeguro } from './entities/tramite-seguro.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class TramiteSeguroService {

  private readonly logger = new Logger('TramiteSeguroService');

  constructor(
    @InjectRepository(TramiteSeguro)
    private readonly tramiteSeguroRepository: Repository<TramiteSeguro>
  ){}

  async create(createTramiteSeguroDto: CreateTramiteSeguroDto) {
    try {
      
      const {...tramiteSeguro} = createTramiteSeguroDto;

      const nuevoTramiteSeguro = await this.tramiteSeguroRepository.create({...tramiteSeguro})

      await this.tramiteSeguroRepository.save(nuevoTramiteSeguro);
      return {...nuevoTramiteSeguro};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const tramitesSeguro = await this.tramiteSeguroRepository.find({
      take:limit,
      skip : offset,
      relations: ['vehiculo', 'cliente', 'aseguradora']
    })

    return tramitesSeguro;
  }

  async findOne(id: number) {
    const tramiteSeguro = await this.tramiteSeguroRepository.findOne({
      where: {idTramiteSeguro : id},
      relations: ['vehiculo', 'cliente', 'aseguradora']
    });

    if (!tramiteSeguro) {
      throw new NotFoundException(`El trámite de seguro con id ${id} no fue encontrado`);
    }

    return tramiteSeguro;
  }

  async update(id: number, updateTramiteSeguroDto: UpdateTramiteSeguroDto) {
    const {...toUpdate} = updateTramiteSeguroDto;

    const tramiteSeguro = await this.tramiteSeguroRepository.preload({
      idTramiteSeguro : id, 
      ...toUpdate
    })

    if (!tramiteSeguro) {
      throw new NotFoundException(`El trámite de seguro con id ${id} no fue encontrado`);
    }

    return this.tramiteSeguroRepository.save(tramiteSeguro);

  }

  async remove(id: number) {
    const tramiteSeguro = await this.findOne(id);
    await this.tramiteSeguroRepository.remove(tramiteSeguro!);
  }
}




