import City from "./city.entity";

export const cityProvider = [
    {
        provide : 'CITY_REPOSITORY',
        useValue:City
    }
]