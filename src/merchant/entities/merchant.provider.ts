import Merchant from "./merchant.entity";

export const merchantProvider = [{
    provide : 'MERCHANT_REPOSITORY',
    useValue : Merchant
}]