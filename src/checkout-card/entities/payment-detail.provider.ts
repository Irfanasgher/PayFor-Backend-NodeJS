import checkoutPaymentDetails from "./payment-detail.entity";

export const paymentDetailProvider = [{
    provide:'PAYMENT_DETAIL_REPOSITORY',
    useValue:checkoutPaymentDetails
}]