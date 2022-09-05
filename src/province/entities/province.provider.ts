import Province from "./province.entity";

export const provinceProvider = [{
    provide : 'PROVINCE_REPOSITORY',
    useValue : Province
}]