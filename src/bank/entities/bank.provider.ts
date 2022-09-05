import Bank from './bank.entity';

export const bankProvider = [{
    provide : 'BANK_REPOSITORY',
    useValue : Bank
}]