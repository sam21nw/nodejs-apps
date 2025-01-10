export interface Item {
    id: string;
    item: string;
    checked: boolean;
}

export class ListItem {
    private _listItem: Item;
    constructor(listItem: Item) {
        this._listItem = listItem;
    }

    getValue = <K extends keyof Item>(key: K) => {
        return this._listItem[key];
    };
    setValue = <K extends keyof Item, P extends Item[K]>(key: K, prop: P) => {
        this._listItem[key] = prop;
    };
    getListItem = () => {
        return this._listItem;
    };
}
