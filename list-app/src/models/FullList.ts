import { type Item } from './ListItem';

export class FullList {
    private _list: Item[] = [];
    static instance: FullList = new FullList();
    private constructor() {
        this.load();
    }
    get list(): Item[] {
        return this._list;
    }
    load(): void {
        const savedList = JSON.parse(localStorage.getItem('myList') || '[]');
        this._list = savedList;
    }
    save(): void {
        localStorage.setItem('myList', JSON.stringify(this._list));
    }
    addOrUpdate(itemObj: Item): void {
        const index = this._list.findIndex((item) => item.id === itemObj.id);
        if (index !== -1) {
            this._list[index] = itemObj;
        } else {
            this._list.push(itemObj);
        }
        this.save();
    }

    remove(id: string): void {
        this._list = this._list.filter((item) => item.id !== id);
        console.log(`Item in local storage with id:${id} removed.`);
        this.save();
    }
    clear(): void {
        this._list = [];
        this.save();
    }
}
