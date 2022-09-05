import ShippingAddress from "./shippingAddress.entity";

export const shippingAddressProvider =[
    {
        provide:'SHIPPING_ADDRESS_REPOSITORY',
        useValue:ShippingAddress
    }
]