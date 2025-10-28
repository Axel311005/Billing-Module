import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateAseguradoraDto } from './dto/create-aseguradora.dto';
import { UpdateAseguradoraDto } from './dto/update-aseguradora.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aseguradora } from './entities/aseguradora.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class AseguradoraService {

  private readonly logger = new Logger('AseguradoraService');

  constructor(
    @InjectRepository(Aseguradora)
    private readonly aseguradoraRepository: Repository<Aseguradora>
  ){}

  async create(createAseguradoraDto: CreateAseguradoraDto) {
    try {
      
      const {...aseguradora} = createAseguradoraDto;

      const nuevaAseguradora = await this.aseguradoraRepository.create({...aseguradora})

      await this.aseguradoraRepository.save(nuevaAseguradora);
      return {...nuevaAseguradora};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const aseguradoras = await this.aseguradoraRepository.find({
      take:limit,
      skip : offset,
    })

    return aseguradoras;
  }

  async findOne(id: number) {
    const aseguradora = await this.aseguradoraRepository.findOneBy({idAseguradora : id});

    if (!aseguradora) {
      throw new NotFoundException(`La aseguradora con id ${id} no fue encontrada`);
    }

    return aseguradora;
  }

  async update(id: number, updateAseguradoraDto: UpdateAseguradoraDto) {
    const {...toUpdate} = updateAseguradoraDto;

    const aseguradora = await this.aseguradoraRepository.preload({
      idAseguradora : id, 
      ...toUpdate
    })

    if (!aseguradora) {
      throw new NotFoundException(`La aseguradora con id ${id} no fue encontrada`);
    }

    return this.aseguradoraRepository.save(aseguradora);

  }

  async remove(id: number) {
    const aseguradora = await this.findOne(id);
    await this.aseguradoraRepository.remove(aseguradora!);
  }
}




