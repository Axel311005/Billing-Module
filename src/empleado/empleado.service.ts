import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class EmpleadoService {
  private readonly logger = new Logger('EmpleadoService');

  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto) {
    try {
      const empleado = this.empleadoRepository.create({
        ...createEmpleadoDto,
      });
      await this.empleadoRepository.save(empleado);
      return empleado;
    } catch (error) {
      console.log(error);
      this.logger.error(error.message, error.stack);
      throw new BadRequestException('No se pudo crear el empleado');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.empleadoRepository.find({
      take: limit,
      skip: offset,
      relations: ['user'],
      order: { idEmpleado: 'ASC' },
    });
  }

  async findOne(id: number) {
    const empleado = await this.empleadoRepository.findOne({
      where: { idEmpleado: id },
    });
    if (!empleado) {
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    }
    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    const empleado = await this.empleadoRepository.preload({
      idEmpleado: id,
      ...updateEmpleadoDto,
    });

    if (!empleado) {
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    }

    return this.empleadoRepository.save(empleado);
  }

  async remove(id: number) {
    const empleado = await this.findOne(id);
    await this.empleadoRepository.remove(empleado);
  }
}
