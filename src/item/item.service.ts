import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemService {

  private readonly logger = new Logger('ItemService');
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository : Repository<Item>
  ) {}


  async create(createItemDto: CreateItemDto) {
    try {
      const {...itemDetails} = createItemDto

      const item = this.itemRepository.create({...itemDetails});

      await this.itemRepository.save(item);

      return item;
      
    } catch (error) {
      this.handleDbException(error);

    }
  }

  findAll() {
    return `This action returns all item`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }

  private handleDbException( error : any){
    if(error.code == '23505'){
        throw new BadRequestException(error.detail);
      }
      this.logger.error(error);
      throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
