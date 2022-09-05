import { Injectable } from '@nestjs/common';
import { CreateItemCategoryDto } from './dto/create-item-category.dto';
import { UpdateItemCategoryDto } from './dto/update-item-category.dto';

@Injectable()
export class ItemCategoryService {
  create(createItemCategoryDto: CreateItemCategoryDto) {
    return 'This action adds a new itemCategory';
  }

  findAll() {
    return `This action returns all itemCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemCategory`;
  }

  update(id: number, updateItemCategoryDto: UpdateItemCategoryDto) {
    return `This action updates a #${id} itemCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemCategory`;
  }
}
