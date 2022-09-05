import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { AddressService } from 'src/address/address.service';
import { ItemDetailsService } from 'src/item-details/item-details.service';
import { OrderInstallmentPlanService } from 'src/order-installment-plan/order-installment-plan.service';
import { StoreService } from 'src/store/store.service';
import { UserService } from 'src/user/user.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import OrderDetail from './entities/order-detail.entity';
import * as PDFDocument from 'pdfkit'
import ItemDetail from 'src/item-details/entities/item-detail.entity';
import { CheckoutCardService } from 'src/checkout-card/checkout-card.service';
import User from 'src/user/entities/user.entity';
import { MailBoxService } from 'src/mail-box/mail-box.service';
import InstallmentPayout from 'src/installment-payout/entities/installment-payout.entity';
import Store from 'src/store/entities/store.entity';
import ShippingAddress from 'src/address/entities/shippingAddress.entity';
import Account from 'src/account/entities/account.entity';
import Address from 'src/address/entities/address.entity';
import sequelize from 'sequelize';

@Injectable()
export class OrderDetailService {

  constructor(
    
    @Inject('ORDER_DETAIL_REPOSITORY')
    private readonly orderModel:typeof OrderDetail,

    private storeService : StoreService,
    private itemService : ItemDetailsService,
    private userService : UserService,
    private addressService : AddressService,
    private accountService : AccountService,
    private orderInstallmentPlan : OrderInstallmentPlanService,
    @Inject(forwardRef(()=>CheckoutCardService))
    private checkoutService : CheckoutCardService,
    private mailboxService : MailBoxService

  ){}

  async createNop(createOrderDetailDto,res) {
    try{

      // create user on payfor or return user_id if already exist
      const {user,accountToCreate} = await this.userService.CreateUserNop(createOrderDetailDto.user);
      const {id} = user
      console.log(user,id);
      if(accountToCreate){

        // create generic user login on payfor
        let genericUserOnPayfor={
          email:createOrderDetailDto.user.email,
          password:createOrderDetailDto.user.phoneNumber,
          user_id:id
        }
        await this.accountService.createNopCustomerAccount(genericUserOnPayfor);
        
      }
      
      // card new object
      // let card = {...createOrderDetailDto.user,user_id:id,isPrimary:1,isForPayment:1}
      // await this.checkoutService.create(card,res,"nop")

      // create store and return ID if exist
      const {store_id} = await this.storeService.createStoreForNop(createOrderDetailDto.store_name,createOrderDetailDto.store_url);
      const order = await this.orderModel.create(
        {
          user_id:id,
          store_id,
          order_nop_id:createOrderDetailDto.order_id,
          price:createOrderDetailDto.order_price,
          shipping_charges:createOrderDetailDto.shipping_charges,
          assurance_amount:createOrderDetailDto.assurance_amount,
          isoCurrency:createOrderDetailDto.isoCurrency,
          is_completed:0,
          order_pdf:""
        })
     
      // put all the items against nop order
      const itemsReturnPromise = Promise.all(createOrderDetailDto.items_detail.map(async(e)=>{
        return await this.itemService.createItemNop(
          order.id,store_id,
          e
        )
      }))

      // create user address to maintain the history of order on payfor
      await this.addressService.createNop(createOrderDetailDto.address,id)

      
      // break out into installments
      // signature installmentPlanNop(user_id,store_id,order_id,price)
      
      const {installment_payout_id,amount} = await this.orderInstallmentPlan.installmentPlanNop(id,store_id,order.id,createOrderDetailDto.order_price,createOrderDetailDto.shipping_charges,createOrderDetailDto.assurance_amount)
      // terminate installment plan

      Promise.all([itemsReturnPromise]).then(async(result)=> 
        { 
         res.status(200).json({message:"order has been placed",redirectUrl:`https://payfor-front.azurewebsites.net/nopcheckout/${id}/${order.id}/${installment_payout_id}/${amount}/${createOrderDetailDto.isoCurrency}`})
        }
      )
      .catch(err=>res.status(500).json({messaage:"Transaction Failed"}))

    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async fullfillOrder(id){
    try{
      await this.orderModel.update({is_completed:1},{where:{id}})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }


  async generatePDF(order_id:number): Promise<Buffer> {

    const pdfBuffer: Buffer = await new Promise(async resolve => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      })

      doc.image('./logo.png', 250, 20, {fit: [100, 100]})

      doc.moveDown();

      // customize your PDF document

      const {id,itemDetail} = await this.findOne(order_id);

      // heading
      let yPos = doc.y;


      doc
      .fontSize(10)
      .text("Order # " +id, (490), (60));
      doc.moveDown();
      doc.moveDown();


      // item detail


      doc
      .fontSize(12)
      .text("Name", (100), (yPos))
      .text("Description", (200), (yPos))
      .text("Size", (300), (yPos))
      .text("Price", (400), (yPos))

      doc.moveDown();

      
      itemDetail.map((item,i) => {
        let yPos = doc.y;
        
        doc
          .fontSize(8)
          .text(item.item_name, (100), (yPos+i))
          .text(item.item_description, (200), (yPos+i))
          .text(item.item_size, (300), (yPos+i))
          .text(item.item_price, (400), (yPos+i))
          
      });
      doc.end()


      const buffer = []
      doc.on('data', buffer.push.bind(buffer))
      doc.on('end', () => {
        const data = Buffer.concat(buffer)
        resolve(data)
      });

      
    })

    return pdfBuffer
  }

  async findOne(id: number) {
    try{
      return await this.orderModel.findOne({include:[
        {model:ItemDetail},{model:User},{model:Store}
      ]
      ,
      where:{id}})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

 
  async orderConfirmation(orderinfo){
    try{
      const order = await this.findOne(orderinfo.order_id)
      await this.mailboxService.orderConfirmationDetailMail(order,orderinfo.email)
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  // get all orders for admin portal

  

  async getAllOrder(res) {
    try{
      const orders = await this.orderModel.findAll({include:[
        {model:ShippingAddress},{model:Store},{model:InstallmentPayout},{model:ItemDetail},{model:User,include:[{model:Address,attributes:{exclude:['city_id','province_id','country_id']}},{model:Account,attributes:{exclude:['password']}}] ,attributes:{exclude:['stripe_customer_id','createdAt','updatedAt']}}
      ]});
      return res.status(200).json({orders,status:200});
    }
    catch(err){
      return ({message:err,status:400});
      
    }
  }

 
  async updateorderPaymentId(payment_id,id){
    try{
      return await this.orderModel.update({payment_id},{where:{id}})
    }catch(err){throw new InternalServerErrorException(err)}
  }

  async getAllOrderNumber(res){
    try{
      const orderNumber = await this.orderModel.count();
      return res.status(200).json({orderNumber,status:200});
    }
    catch(err){
      res.status(400).json({message:err});
    }
  }

  async getAllOrderNumberByMerchant(res,store_id){
    try{
      const orderNumber = await this.orderModel.findAll({where:{store_id}});
      return res.status(200).json({orderNumber:orderNumber.length,status:200});
    }
    catch(err){
      res.status(400).json({message:err});
    }
  }


  async getAllCompletedOrderNumberByMerchant(res,store_id){
    try{
      const orderNumber = await this.orderModel.findAll({where:{store_id,is_completed:1}});
      return res.status(200).json({orderNumber:orderNumber.length,status:200});
    }
    catch(err){
      res.status(400).json({message:err});
    }
  }
  

  async getOrderStatus(res){
    try{
      const pendingOrder = await this.orderModel.findAll({where:{is_completed:0}});
      const CompleteOrder = await this.orderModel.findAll({where:{is_completed:1}});
      const refund = await this.itemService.refundNumber();
      return res.status(200).json({data:[pendingOrder.length,CompleteOrder.length,refund.refundednumber],status:200});
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }


  async getOrderStatusByMerchant(res,store_id){
    try{
      const pendingOrder = await this.orderModel.findAll({where:{is_completed:0,store_id}});
      const CompleteOrder = await this.orderModel.findAll({where:{is_completed:1,store_id}});
      const refund = await this.itemService.refundNumberByStore(store_id);
      return res.status(200).json({data:[pendingOrder.length,CompleteOrder.length,refund.refundednumber],status:200});
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async getAllOrderByCompanyId(store_id,res){
    try{
      const orders = await this.orderModel.findAll({include:[
        {model:ShippingAddress},{model:Store},{model:InstallmentPayout},{model:ItemDetail},{model:User,include:[{model:Address,attributes:{exclude:['city_id','province_id','country_id']}},{model:Account,attributes:{exclude:['password']}}] ,attributes:{exclude:['stripe_customer_id','createdAt','updatedAt']}}
      ],where:{store_id}});
      return res.status(200).json({orders,status:200});
    }
    catch(err){
      return ({message:err,status:400});
      
    }
  }


  async getAllOrderByDayGraph(res){
    try{
      const order = await this.orderModel.findAll({      
        group: ['createdAt'],
        attributes: ['createdAt', [sequelize.fn('COUNT', 'createdAt'), 'TagCount']],
      })
      
      return res.status(200).json(order);
    }
    catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async getAllOrderByDayGraphMerchant(res,store_id){
    try{
      const order = await this.orderModel.findAll({      
        group: ['createdAt'],
        attributes: ['createdAt', [sequelize.fn('COUNT', 'createdAt'), 'TagCount']],
        where:{store_id}
      })
      // const dates = order.map((date)=>date.createdAt);
      // const orders = order.map((order)=>order?.TagCount);
      console.log(order)
      return res.status(200).json(order);
    }
    catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async getAllOrderMonthlyGraph(){
    try{

      return await this.orderModel.findAll({
        group:[ sequelize.fn('MONTH', sequelize.col('createdAt'))],
        attributes: ['createdAt', [sequelize.fn('COUNT', 'createdAt'), 'TagCount']],
       })

    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async getAllOrderMonthlyGraphByMerchant(store_id){
    try{

      const order= await this.orderModel.findAll({
        group:[ sequelize.fn('MONTH', sequelize.col('createdAt'))],
        attributes: ['createdAt', [sequelize.fn('COUNT', 'createdAt'), 'TagCount']],
        where:{store_id}
       });

      const refund = await this.itemService.refundGraph(store_id);
      console.log(order,refund,"rrrrrrrrrrrr")
       return {order,refund}
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }


}
