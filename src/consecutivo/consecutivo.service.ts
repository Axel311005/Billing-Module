import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateConsecutivoDto } from './dto/create-consecutivo.dto';
import { UpdateConsecutivoDto } from './dto/update-consecutivo.dto';
import { Repository } from 'typeorm';
import { Consecutivo } from './entities/consecutivo.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ConsecutivoService {

  private readonly logger = new Logger('ConsecutivoService');

  constructor(
    @InjectRepository(Consecutivo)
    private readonly consecutivoRepo : Repository<Consecutivo>
  ){}

  
  async create(createConsecutivoDto: CreateConsecutivoDto) {
    
    try {
      const consecutivo = 
      this.consecutivoRepo.create({...createConsecutivoDto})

      await this.consecutivoRepo.save(consecutivo);

      return {...consecutivo};
      
      
    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto : PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const consecutivos = await this.consecutivoRepo.find({
      take:limit,
      skip : offset,
    })

    return consecutivos;
  }

  async findOne(id: number) {
    const consecutivo = await this.consecutivoRepo.findOneBy({idConsecutivo  : id});

    if(!consecutivo){
      throw new NotFoundException(`El consecutivo con id ${id} no fue encontrado`);
    }

    return consecutivo;
  }

  async update(id: number, updateConsecutivoDto: UpdateConsecutivoDto) {
    const {...toUpdate} = updateConsecutivoDto;

    const consecutivo = await this.consecutivoRepo.preload({
      idConsecutivo : id,
      ...toUpdate
    });

    if(!consecutivo){
      throw new NotFoundException(`El consecutivo con id ${id} no fue encontrado`);
    }

    return this.consecutivoRepo.save(consecutivo);


  }

  async remove(id: number) {
    const consecutivo = await this.findOne(id);

    await this.consecutivoRepo.remove(consecutivo!);
  }

  async obtenerSiguienteConsecutivo(documento: string): Promise<string> {
    
    const consecutivo = await this.consecutivoRepo.findOne({
      where: { documento, activo: true },
    });

    if (!consecutivo) {
      throw new Error(`No existe consecutivo activo para el documento: ${documento}`);
    }

    
    let siguiente = consecutivo.ultimoValor + 1;

    
    if (siguiente > consecutivo.valorFinal) {
      throw new Error(`Se alcanzó el valor máximo del consecutivo (${consecutivo.valorFinal}).`);
    }

    // .padStart rellena con ceros a la izquierda hasta que alcanza la longitud establecida para ese consecutivo
    const numeroFormateado = String(siguiente).padStart(consecutivo.longitud, '0');

    
    let resultado: string;
    if (consecutivo.mascara) {
      
      resultado = consecutivo.mascara.replace(/\{0+\}/, numeroFormateado);
    } else {
      resultado = numeroFormateado;
    }

    consecutivo.ultimoValor = siguiente;
    await this.consecutivoRepo.save(consecutivo);

    return resultado;
  }
}
