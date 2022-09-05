import Company from "./company.entity";

export const companyProvider = [{
    provide : 'COMPANY_REPOSITORY',
    useValue : Company
}]