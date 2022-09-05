import { Injectable } from '@nestjs/common';
import { CreateSubStoreDto } from './dto/create-sub-store.dto';
import { UpdateSubStoreDto } from './dto/update-sub-store.dto';

@Injectable()
export class SubStoreService {
  create(createSubStoreDto: CreateSubStoreDto) {
    return 'This action adds a new subStore';
  }

  findAll() {
    return `This action returns all subStore`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subStore`;
  }

  update(id: number, updateSubStoreDto: UpdateSubStoreDto) {
    return `This action updates a #${id} subStore`;
  }

  remove(id: number) {
    return `This action removes a #${id} subStore`;
  }
}
