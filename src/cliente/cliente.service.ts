import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class ClienteService {

  private readonly logger = new Logger('ClienteService');

  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>
  ){}

  async create(createClienteDto: CreateClienteDto) {
    try {
      
      const {...cliente} = createClienteDto;

      const nuevoCliente = await this.clienteRepository.create({...cliente})

      await this.clienteRepository.save(nuevoCliente);
      return {...nuevoCliente};

    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset=0} = paginationDto
    const clientes = await this.clienteRepository.find({
      take:limit,
      skip : offset,
    })

    return clientes;
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOneBy({idCliente : id});

    if (!cliente) {
      throw new NotFoundException(`El cliente con id ${id} no fue encontrado`);
    }

    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const {...toUpdate} = updateClienteDto;

    const cliente = await this.clienteRepository.preload({
      idCliente : id, 
      ...toUpdate
    })

    if (!cliente) {
      throw new NotFoundException(`El cliente con id ${id} no fue encontrado`);
    }

    return this.clienteRepository.save(cliente);

  }

  async remove(id: number) {
    const cliente = await this.findOne(id);
    await this.clienteRepository.remove(cliente!);
  }
}
