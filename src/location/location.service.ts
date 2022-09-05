import { Inject, Injectable } from '@nestjs/common';
import Employee from 'src/employee/entities/employee.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import Location from './entities/location.entity';

@Injectable()
export class LocationService {

  constructor(
    @Inject("LOCATION_REPOSITORY")
    private readonly locationModel : typeof Location
  ){}

  async create(createLocationDto: CreateLocationDto,res) {
    try{
      const data = await this.locationModel.create(createLocationDto);
      res.status(200).json({data,message:"Location added successfully",status:200})
    }
    catch(err){
      return res.status(400).json({message:err,status:400})
    }
  }

  async findAll(company_id,res) {
    try{
      return await this.locationModel.findAll({include:[{model:Employee,attributes:['name']}],where:{company_id}})
    }
    catch(err){
      return res.status(400).json({message:err,status:400})
    }
  }

  async findOne(id: number,res) {
    try{
      return await this.locationModel.findOne({where:{id}})
    }
    catch(err){
      return res.status(400).json({message:err,status:400})
    }
  }

  async update(id: number, updateLocationDto: UpdateLocationDto,res) {
    try{
      const data= await this.locationModel.update(updateLocationDto,{where:{id}})
      return res.status(200).json({data,message:"Location updated",status:200})
    }
    catch(err){
      return res.status(400).json({message:err,status:400})
    }
  }

  async remove(id: number,res) {
    try{
      await this.locationModel.destroy({where:{id}});
      return res.status(200).json({message:"Location deleted",status:400});
    }
    catch(err){
      return res.status(400).json({message:err,status:400})
    }
  }
}
