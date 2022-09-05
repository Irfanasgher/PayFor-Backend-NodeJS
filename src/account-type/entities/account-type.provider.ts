import AccountType from "./account-type.entity";

export const accountTypeProvider = [
    {
        provide : 'ACCOUNT_TYPE_REPOSITORY',
        useValue : AccountType
    }
]