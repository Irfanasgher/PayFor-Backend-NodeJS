// // try{
// //     console.log(token)
//     const payment = await cko.payments.request({
//       source: {
//         type:'token',
//         token
//     },
//     currency:'PKR',
    
//     "3ds":{
//       enabled:true,
//       attempt_n3d:true
//     },
//     amount:1,
//     success_url:'https://payfor-front.azurewebsites.net/success',
//     failure_url:'https://payfor-front.azurewebsites.net/fail'
//   });

//   console.log(payment,"paymentpayment")
//   // await this.newPaymentDetail(user_id,installment_id,payment['id'],"fullfilled")
//   // await this.clearInstallments({installment_payout_id:installment_id},res);
// }