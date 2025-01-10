import { dbHost } from '../env-config';
import { FullList } from './models/FullList';
import { ListItem, type Item } from './models/ListItem';
import { ListTemplate } from './templates/ListTemplate';

import { assert } from 'node:console';

// const listsUrl = `${dbHost}/list`;

// Sample
// const listItem = {
//     id: '5',
//     item: 'list item five',
//     checked: false
// };
function logObject(obj: Object) {
    console.clear();
    console.table(obj);
}

const initApp = () => {
    const fullList = FullList.instance;
    const template = ListTemplate.instance;

    const itemEntryForm = document.getElementById(
        'itemEntryForm'
    ) as HTMLFormElement;
    itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
        event.preventDefault();
        const input = document.getElementById('newItem') as HTMLInputElement;
        const newEntryText: string = input.value.trim();
        if (!newEntryText.length) {
            return;
        }
        let itemId: number;
        if (fullList.list.length) {
            itemId = parseInt(fullList.list[fullList.list.length - 1].id) + 1;
        } else {
            itemId = 1;
        }
        const newItem: Item = {
            id: itemId.toString(),
            item: newEntryText,
            checked: false
        };
        fullList.addOrUpdate(newItem);
        template.render(fullList);
        input.value = '';
        logObject(fullList.list);
    });

    const clearItems = document.getElementById(
        'clearItemsButton'
    ) as HTMLButtonElement;
    clearItems.addEventListener('click', () => {
        fullList.clear();
        template.clear();
        logObject(fullList.list);
    });
    // fullList.load();
    template.render(fullList);
};

document.addEventListener('DOMContentLoaded', initApp);
