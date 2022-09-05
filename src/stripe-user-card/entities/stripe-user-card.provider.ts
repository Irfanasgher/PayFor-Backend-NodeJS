import StripeUserCard from "./stripe-user-card.entity";

export const stripeUserCardProvider = [
    {
        provide : 'STRIPE_USER_CARD_REPOSITORY',
        useValue : StripeUserCard
    }
]