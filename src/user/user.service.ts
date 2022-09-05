import { forwardRef, HttpCode, HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import sequelize from 'sequelize';
import { AccountService } from 'src/account/account.service';
import Account from 'src/account/entities/account.entity';
import { AddressService } from 'src/address/address.service';
import Address from 'src/address/entities/address.entity';
import City from 'src/city/entities/city.entity';
import { CompanyService } from 'src/company/company.service';
import Country from 'src/country/entities/country.entity';
import InstallmentPayout from 'src/installment-payout/entities/installment-payout.entity';
import ItemDetail from 'src/item-details/entities/item-detail.entity';
import { MailBoxService } from 'src/mail-box/mail-box.service';
import { MerchantService } from 'src/merchant/merchant.service';
import OrderDetail from 'src/order-detail/entities/order-detail.entity';
import { PhoneVerificationService } from 'src/phone-verification/phone-verification.service';
import Province from 'src/province/entities/province.entity';
import Store from 'src/store/entities/store.entity';
import { StripeService } from 'src/stripe/stripe.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(

    @Inject("USER_REPOSITORY")
    private readonly userModel : typeof User,
    
    @Inject(forwardRef(() => PhoneVerificationService))
    private readonly phoneVerificationService : PhoneVerificationService,
    private readonly address : AddressService,
    private readonly accountService : AccountService,
    private readonly stripeService : StripeService,
    private readonly mailService : MailBoxService,
    private readonly merchantService : MerchantService
  ){}

  async signUp(createUserDto: CreateUserDto,res) {
    try{
      
      // verify phone number
      const IsPhoneVerified = await this.phoneVerificationService.IsPhoneVerified(createUserDto.phone_number);
      
      // if phone number is not verified
      if(!IsPhoneVerified) res.status(400).json({message:"Phone_number is not verified or registered",status:400});
      
      // check either user already exist or not

      const isUserAlreadyExist = await this.accountService.verifyAccount(createUserDto);
      if(isUserAlreadyExist)  res.status(400).json({message:"Email is already in use",status:400});


      // create customer on stripe
      const stripeCustomer = {
        email:createUserDto.email,
        name : createUserDto.first_name
      };

      const stripe_customer_id =  await this.stripeService.createCustomer(stripeCustomer)

      
      // create user basic in user tbl
      const {id} = await this.CreateUser(createUserDto,stripe_customer_id)
 
      // create user adress
      // pass id that is the User_id
      await this.address.create(createUserDto,id)
      
      // create User account
      
      await this.accountService.createCustomerAccount(createUserDto,id)

      res.status(200).json({message:"user registered successfully",status:200})

    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  // create user from signUp
  async CreateUser({first_name,last_name,phone_number,dob,nic},stripe_customer_id){
    try{
      // destruct the object for user tbl
      return await this.userModel.create({first_name,last_name,phone_number,dob,nic,stripe_customer_id})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async isUserAlreadyExist(phone_number){
    try{
      return await this.userModel.findOne({where:{phone_number}})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }


  
  // create user from signUp
  async CreateUserNop({first_name,last_name,phoneNumber}){
    try{
      const user = await this.userModel.findOne({where:{phone_number:phoneNumber}})
      if(user){
        console.log(user);
        return {user,accountToCreate:false}
      }else{

        // destruct the object for user tbl
        const user = await this.userModel.create({first_name,last_name,phone_number:phoneNumber});
        return {user,accountToCreate:true}
      }
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }


  // login 
  async login (userInfo,res){
    try{
      const user_id = await this.accountService.validateUser(userInfo)
      const accountDetail = await this.accountService.login(user_id)
      if(accountDetail){
        return accountDetail
      }
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  

  async findOne(userid:number,res) {
    try{
      let {id,first_name,last_name,phone_number,dob,account,credit_limit,address,nic,orderDetail} =  await this.userModel.findOne({

          attributes:{exclude:['createdAt','updatedAt']},
        
          where:{id:userid},
        
          include:
          [
            // email
            {
              model:Account,attributes:{exclude:['createdAt','updatedAt','id','password','user_id']}
            },

            // address
            {
              model:Address,attributes:['address','postal_code'],
              include:[
                {
                  model:Country,
                  attributes:{exclude:['createdAt','updatedAt','id']}
                },
                {
                  model:Province,
                  attributes:{exclude:['createdAt','updatedAt','id']}
                },
                {
                  model:City,
                  attributes:{exclude:['createdAt','updatedAt','id']}
                }
              ]
            }, 
            
            // order detail
            {
              model:OrderDetail,
              attributes:{exclude:['updatedAt','store_id']},
              include:[
                // installmentPayout
                {
                  model:InstallmentPayout,attributes:{exclude:['createdAt','updatedAt']}
                },
                // storeDEtail
                {
                  model:Store,attributes:{exclude:['createdAt','updatedAt']}
                },
                {
                  model:ItemDetail,attributes:{exclude:['updatedAt']}
                }
              ]
            },


          ],
          
      });

      const user= {
        id,first_name,last_name,phone_number,dob,nic,credit_limit,
        email:account?.email,
        country:address?.country?.name,
        province:address?.province?.name,
        city:address?.city?.name,
        postal_code:address?.postal_code,
        address:address?.address,
        orderDetail
      }

      return {user_id:id,user,status:200};
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }


  async getSingleUser(id){
    try{
      return await this.userModel.findOne({where:{id},
        include:[{model:Account,attributes:{exclude:['createdAt','updatedAt','id','password','user_id']}}]
      })
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

   // update user from profile
   async updateUser({first_name,last_name,phone_number,dob,nic},id){
    try{
      // destruct the object for user tbl
      return await this.userModel.update({first_name,last_name,phone_number,dob,nic},{where:{id}})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }


  async update(id: number, updateUserDto: UpdateUserDto,res) {
    
      
      // verify phone number
      const IsPhoneVerified = await this.phoneVerificationService.IsPhoneVerified(updateUserDto.phone_number);
      
      // if phone number is not verified
      if(!IsPhoneVerified) res.status(400).json({message:"Phone_number is not verified or registered",status:400});
      
      // check either user already exist or not

      const isUserAlreadyExist = await this.accountService.verifyAccount(updateUserDto);
      if(isUserAlreadyExist){
        // update queries put here
        await this.updateUser(updateUserDto,id);

        // update address        
        await this.address.updateAddressFromUser(updateUserDto,id)

        res.status(200).json({message:"profile updated ",status:200})

      }
      
  }


  async updateUserCreditLimit(user_id,credit_limit,res){
    try{
       await this.userModel.update({credit_limit},{where:{id:user_id}})
       res.status(200).json({message:"credit limit updated successfully",status:200});
    }
    catch(err){
      return res.status(400).json({message:err,status:400})
    }
  }



  // get all customers on merchant portal
  

  async getallcustomers(res) {
    try{

      let users =  await this.userModel.findAll({

          attributes:{exclude:['createdAt','updatedAt','stripe_customer_id']},
        
          
          include:
          [
            // account detail
            {
              model:Account,attributes:{exclude:['password','user_id','createdAt','updatedAt','account_type_id']}
            },

            // address
            {
              model:Address,attributes:['address','postal_code'],
            }, 
            
            // order detail
            {
              model:OrderDetail,
              attributes:{exclude:['updatedAt','store_id']},
              include:[
                // installmentPayout
                {
                  model:InstallmentPayout,attributes:{exclude:['createdAt','updatedAt']}
                },
                // storeDEtail
                {
                  model:Store,attributes:{exclude:['createdAt','updatedAt']}
                },
                {
                  model:ItemDetail,attributes:{exclude:['updatedAt']}
                }
              ]
            },


          ],
          
      });

      let updatedUser= users.map((user)=>{
        let totalSpend=0;
        user.orderDetail.map((order)=>{
          totalSpend=totalSpend+order.price;
        });

        return {user,totalSpend,lastOrderPrice:user?.orderDetail[user?.orderDetail?.length-1]?.price}
        

      })


      return res.status(200).json({users:updatedUser,status:200});
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }


  async getallcustomersByCompanyId(res,store_id){
    try{
       

      let users =  await this.userModel.findAll({

          attributes:{exclude:['createdAt','updatedAt','stripe_customer_id']},
        
          
          include:
          [
            // account detail
            {
              model:Account,attributes:{exclude:['password','user_id','createdAt','updatedAt','account_type_id']}
            },

            // address
            {
              model:Address,attributes:['address','postal_code'],
            }, 
            
            // order detail
            {
              model:OrderDetail,
              attributes:{exclude:['updatedAt','store_id']},
              include:[
                // installmentPayout
                {
                  model:InstallmentPayout,attributes:{exclude:['createdAt','updatedAt']}
                },
                // storeDEtail
                {
                  model:Store,attributes:{exclude:['createdAt','updatedAt']}
                },
                {
                  model:ItemDetail,attributes:{exclude:['updatedAt']}
                }
              ],
              where:{store_id}
            },


          ],
          
      });

      let updatedUser= users.map((user)=>{
        let totalSpend=0;
        user.orderDetail.map((order)=>{
          totalSpend=totalSpend+order.price;
        });

        return {user,totalSpend,lastOrderPrice:user?.orderDetail[user?.orderDetail?.length-1]?.price}
        

      })


      return res.status(200).json({users:updatedUser,status:200});
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }

  }

  async getallcustomersNumber(res){
    try{
      const customers = await this.userModel.count();
      return res.status(200).json({customers,status:200})
    }catch(err){
      return res.sendStatus(500).json({message:err});
    }
  }

  
  async getallcustomersNumberByMerchant(res,store_id){
    try{
      const users = await this.userModel.findAll({include:[{model:OrderDetail,where:{store_id}}]});
      const customers = users.length;
      return res.status(200).json({customers,status:200})
    }catch(err){
      return res.sendStatus(500).json({message:err});
    }
  }

  // 

  
  
  
  async customerGraph(){
    
    try{
      const customer = await this.userModel.findAll({
        group:[ sequelize.fn('MONTH', sequelize.col('createdAt'))],
        attributes: ['createdAt', [sequelize.fn('COUNT', 'createdAt'), 'TagCount']],        
      });
      const client = await this.merchantService.merhcantClientGraph();
      return {customer,client};
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }


}
