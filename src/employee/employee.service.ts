import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import Employee from './entities/employee.entity';
import * as bcrypt from 'bcrypt';
import { MailBoxService } from 'src/mail-box/mail-box.service';
import Location from 'src/location/entities/location.entity';


@Injectable()
export class EmployeeService {

  constructor(
    @Inject("EMPLOYEE_REPOSITORY")
    private readonly employeeModel : typeof Employee,
    private readonly mailboxService : MailBoxService
  ){}

  async create(createEmployeeDto: CreateEmployeeDto,res) {
    try{
      
      var password = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      const hasedpassword = await this.passwordHasing(password);
      await this.mailboxService.merchantEmail(createEmployeeDto.email,password);
      const employee ={...createEmployeeDto,password:hasedpassword,is_active:1};
      await this.employeeModel.create(employee)
      res.status(200).json({message:"employee has been registered successfully"})
    }
    catch(err){
      return res.status(400).json({message:err,status:400})
    }
  }

  

  // hashing of password
  async passwordHasing(password){

    try{
      const saltOrRounds = 1;
      const hash = await bcrypt.hash(password.toString(), saltOrRounds);
      console.log(hash)
      return hash;
    }
    catch(err){
      return new InternalServerErrorException(err)
    }

  }


  async findAll(merchant_id,res) {
    try{
      return await this.employeeModel.findAll({include:[{model:Location,attributes:['code']}],where:{merchant_id },attributes:{exclude:['location_id','password']}})
    }
    catch(err){
      return res.status(400).json({message:err,status:400})
    }
  }

  async findOne(id: number,res) {
    try{
      return await this.employeeModel.findOne({where:{id }})

    }
    catch(err){
      return res.status(400).json({message:err,status:400})
    }
  }

  async updateLocation(location_id:number,employee:[],res){
    try{
      return await this.employeeModel.update({location_id},{where:{id:employee}})
    }
    catch(err){
      return res.status(400).json({message:err,status:400})
    }
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto,res) {
    try{
      await this.employeeModel.update(updateEmployeeDto,{where:{id}})
      return res.status(200).json({message:"Employee updated successfully"})
    }
    catch(err){
      return res.status(400).json({message:err,status:400})
    }
  }

  async remove(id: number,res) {
    try{
      await this.employeeModel.destroy({where:{id}})
    }
    catch(err){
      return res.status(400).json({message:err,status:400})
    }
  }

  async allemployee(){
    try{
      return await this.employeeModel.findAll({include:[{model:Location,attributes:['code']}],attributes:{exclude:['location_id','password']}})
    }
    catch(err){
      return ({message:err,status:400})
    }
  }


}
