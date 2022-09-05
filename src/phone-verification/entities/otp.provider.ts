import Otp from "./otp.entity";

export const otpProvider = [{
    provide : 'OTP_REPOSITORY',
    useValue : Otp 
}]