import { faker, th } from '@faker-js/faker';
import { Mappable } from './CustomMap';

export class User implements Mappable {
    name: string;
    location: {
        lat: number;
        lng: number;
    };
    color: string = 'red';

    constructor() {
        this.name = faker.person.fullName({ sex: 'male' });
        this.location = {
            lat: faker.location.latitude(),
            lng: faker.location.longitude()
        };
    }

    markerContent(): string {
        return `User Name: ${this.name} at location: ${this.location.lat}, ${this.location.lng}`;
    }
}
