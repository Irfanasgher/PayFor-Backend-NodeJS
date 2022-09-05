import Country from "./country.entity";

export const countryProvider = [{
    provide:'COUNTRY_REPOSITORY',
    useValue:Country
}]