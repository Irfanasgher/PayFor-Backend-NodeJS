import CheckoutCard from "./checkout-card.entity";

export const checkOutCardProvider = [{
    provide:'CHECKOUT_CARD_REPOSITORY',
    useValue:CheckoutCard
}]