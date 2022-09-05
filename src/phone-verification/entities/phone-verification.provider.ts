import PhoneVerification from './phone-verification.entity'

export const phoneVerificationProviders=[{
    provide : 'PHONE_VERIFICATION_REPOSITORY',
    useValue : PhoneVerification
}]