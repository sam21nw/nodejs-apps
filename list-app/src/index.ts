import { dbHost } from '../env-config';
import { FullList } from './models/FullList';

const listsUrl = `${dbHost}/list`;

const listItem = {
    id: '5',
    item: 'list item five',
    checked: false
};
const listItem2 = {
    id: '6',
    item: 'list item another',
    checked: false
};
const listItem3 = {
    id: '7',
    item: 'list item another',
    checked: true
};
const listItem4 = {
    id: '8',
    item: 'list item another',
    checked: false
};

const fullList = FullList.instance;

fullList.load();
console.log(fullList.list);
