import { User } from './models/User';

const data = { id: '4682', name: 'Whoopsies', age: 42 };
const user = new User(data);

console.log(user);
