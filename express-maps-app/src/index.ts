import { CustomMap } from './CustomMap';
import { User } from './User';
import { Company } from './Company';

const user = new User();
const company = new Company();
const customMap = new CustomMap('map');

customMap.addMarker(user).then(() => {
    console.log('Marker added successfully');
}).catch((error) => {
    console.error('Error adding marker:', error);
});

customMap.addMarker(company).then(() => {
    console.log('Marker added successfully');
}).catch((error) => {
    console.error('Error adding marker:', error);
});