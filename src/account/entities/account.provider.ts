import Account from "./account.entity";

export const accountProvider = [
    {
        provide : 'ACCOUNT_REPOSITORY' , 
        useValue : Account
    }
]