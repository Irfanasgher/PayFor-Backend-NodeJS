import { Controller, Get, Post, Body, Patch, Param, Delete,Res } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as PDFDocument from 'pdfkit'
import { OrderConfirmationDto } from './dto/orderConfirmation.dto';

@ApiTags("order-detail")
@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Post("nopcommerce")
  create(@Body() createOrderDetailDto: CreateOrderDetailDto,@Res() res:Response) {
    return this.orderDetailService.createNop(createOrderDetailDto,res);
    // res.status(200).json({message:"transaction successfull"});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderDetailService.findOne(+id);
  }

  @Get("/getorderpdf/:order_id")
  async getPDF(@Param('order_id') order_id:number,@Res() res: Response,) : Promise<void> {

    const buffer = await this.orderDetailService.generatePDF(order_id);
    console.log(buffer,"Asdasdasd")
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    })

    res.end(buffer)

  }

  @Post("confirmOrder")
  orderConfirmation(@Body() orderConfirmation:OrderConfirmationDto,@Res() res: Response){
    return this.orderDetailService.orderConfirmation(orderConfirmation);
  }

  @Get("/admin/getAllOrders")
  getAllOrder(@Res() res:Response){
    return this.orderDetailService.getAllOrder(res);
  }

  @Get("dashboard/getAllOrderNumber")
  getAllOrderNumber(@Res() res:Response){
    return this.orderDetailService.getAllOrderNumber(res);
  }

  @Get("dashboard/getAllOrderNumberByMerchant/:store_id")
  getAllOrderNumberByMerchant(@Res() res:Response,@Param('store_id') store_id:number){
    return this.orderDetailService.getAllOrderNumberByMerchant(res,store_id);
  }

  @Get("dashboard/getAllCompletedOrderNumberByMerchant/:store_id")
  getAllCompletedOrderNumberByMerchant(@Res() res:Response,@Param('store_id') store_id:number){
    return this.orderDetailService.getAllCompletedOrderNumberByMerchant(res,store_id);
  }

  @Get("dashboard/getOrderStatus")
  getOrderStatus(@Res() res:Response){
    return this.orderDetailService.getOrderStatus(res)
  }

  @Get("dashboard/getOrderStatusByMerchant/:store_id")
  getOrderStatusByMerchant(@Res() res:Response,@Param('store_id') store_id:number){
    return this.orderDetailService.getOrderStatusByMerchant(res,store_id)
  }
  


  @Get("admin/getAllOrderByCompanyId/:store_id")
  getAllOrderByCompanyId(@Param('store_id') store_id:number,@Res() res:Response){
    return this.orderDetailService.getAllOrderByCompanyId(store_id,res)
  }


  @Get("admin/getAllOrderByDayGraph")
  getAllOrderByDayGraph(@Res() res:Response){
    return this.orderDetailService.getAllOrderByDayGraph(res)
  }


  @Get("getAllOrderByDayGraphMerchant/:store_id")
  getAllOrderByDayGraphMerchant(@Param('store_id') store_id:number,@Res() res:Response){
    return this.orderDetailService.getAllOrderByDayGraphMerchant(res,store_id)
  }



  @Get("admin/getAllOrderMonthlyGraphByMerchant/:store_id")
  getAllOrderMonthlyGraphByMerchant(@Param('store_id') store_id:number){
    return this.orderDetailService.getAllOrderMonthlyGraphByMerchant(store_id)
  }



}
