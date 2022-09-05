import OrderInstallmentPlan from "./order-installment-plan.entity";

export const orderInstallmentProvider = [
    {
        provide:'ORDER_INSTALLMENT_PLAN',
        useValue:OrderInstallmentPlan
    }
]