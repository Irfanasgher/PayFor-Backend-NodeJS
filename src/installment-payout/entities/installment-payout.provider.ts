import InstallmentPayout from "./installment-payout.entity";

export const installmentPayoutProvider = [
    {
        provide:'INSTALLMENT_PAYOUT_REPOSITORY',
        useValue:InstallmentPayout
    }
]