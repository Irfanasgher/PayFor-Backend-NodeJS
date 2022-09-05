import UserCreditLimit from "./user_credit.entity";

export const userCreditProvider = [{
    provide : 'USER_CREDIT_REPOSITORY',
    useValue : UserCreditLimit
}]