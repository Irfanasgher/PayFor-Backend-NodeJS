import ForgetPassword from "./forget-password.entity";

export const forgetPasswordProvider=[
    {
        provide : 'FORGET_PASSWORD_REPOSITORY',
        useValue : ForgetPassword
    }
]