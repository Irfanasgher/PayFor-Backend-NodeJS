import { Checkout } from 'checkout-sdk-node';



export const jwtConstants = {
    secret : "payforuxyz@123"
}

export const twilio = {
    sid :'ACee604e660e7b2c9a3cfaf1dac7b511d6',
    authToken:'3ebf38256b34d2926d6e78edc31a9e32',
    serviceId:'VA18627e7cff054e9f98dcf1edc7ddb197'
}

export const RdbConfig = {
    dialect: 'mysql',
    host: 'mysql-devdbsrv.mysql.database.azure.com',
    port: 3306,
    username: 'evdbadmin@mysql-devdbsrv.mysql.database.azure.com',
    password: '0s3Aq&0DN3zD5QPC',
    database: 'payforyou',
}

export const ldbConfig = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'payforu',
}



// checkout test

// export const checkoutSecretKey = 'sk_test_bfa233d2-0abe-4001-a74c-a28afb451968';
// export const checkoutPublicKey = 'pk_test_5370a58b-a61f-4f55-815b-fb83db0ae255';

// real

export const checkoutSecretKey = 'sk_2aef4c4e-d1d2-4529-a624-631525833bbe';
export const checkoutPublicKey = 'pk_690b3549-c906-4871-8a45-f810d4f6a2d2';




export const cko = new Checkout(checkoutSecretKey, { pk:  checkoutPublicKey});


// blob storage container

export const azureConfig={
    ACCOUNT_NAME:"evolvecmsstorage",
    KEY:"ay1R5wmAAWxTYVbRHrOdd37/Jk/7CeZzIj/rSsGJfR5dtYEHkXXBm2llfKiKVud0ImPO9x99cNfQjuUNC1i7HQ=="
}
  