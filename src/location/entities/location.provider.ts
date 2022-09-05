import Location from "./location.entity";

export const locationProvider = [
    {
        provide : 'LOCATION_REPOSITORY',
        useValue : Location
    }
]