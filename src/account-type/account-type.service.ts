import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAccountTypeDto } from './dto/create-account-type.dto';
import { UpdateAccountTypeDto } from './dto/update-account-type.dto';
import AccountType from './entities/account-type.entity';

@Injectable()
export class AccountTypeService {
  constructor(
    @Inject("ACCOUNT_TYPE_REPOSITORY")
    private readonly accountTypeModel:typeof AccountType
  ){}

  async create(createAccountTypeDto: CreateAccountTypeDto) {
    
    try{
      const accountType_is_Exist = await this.accountTypeModel.findOne({where:{name:createAccountTypeDto.name}})
      if(accountType_is_Exist){
        return accountType_is_Exist.id
      }else{
        const {id} = await this.accountTypeModel.create(createAccountTypeDto)
        return id;
      }
    }catch(err){
      throw new InternalServerErrorException(err);
    }

  }

  async findAll() {

    try{
      return await this.accountTypeModel.findAll()
    }catch(err){
      throw new InternalServerErrorException(err);
    }

  }

 async findOne(id: number) {
    
    try{
      return this.accountTypeModel.findOne({where:{id}})
    }catch(err){
      throw new InternalServerErrorException(err);
    }

  }

  async update(id: number, updateAccountTypeDto: UpdateAccountTypeDto) {
    
    try{
      return await this.accountTypeModel.update(updateAccountTypeDto,{where:{id}})
    }catch(err){
      throw new InternalServerErrorException(err);
    }

  }

  async remove(id: number) {
    
    try{
      return await this.accountTypeModel.destroy({where:{id}})
    }catch(err){
      throw new InternalServerErrorException(err);
    }

  }
}
