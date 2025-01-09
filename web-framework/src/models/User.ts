import { dbHost } from '../../env-config';

interface UserProps {
    id: string;
    name: string;
    age: number;
}

type Callback = () => void;

export class User {
    private data: UserProps;
    events: { [key: string]: Callback[] } = {};

    constructor(data: UserProps) {
        this.data = data;
    }
    get<K extends keyof UserProps>(propName: K): UserProps[K] {
        return this.data[propName];
    }
    set(update: UserProps): void {
        Object.assign(this.data, update);
    }
    setProp<K extends keyof UserProps, T extends UserProps[K]>(
        propName: K,
        value: T
    ) {
        this.data[propName] = value;
    }
    on(eventName: string, callback: Callback): void {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }
    trigger(eventName: string): void {
        const handlers = this.events[eventName];
        if (!handlers || handlers.length === 0) {
            console.log('oops');
            return;
        }
        handlers.forEach((callback) => {
            callback();
            console.log(eventName);
        });
    }
    static fetchItem(id: string): void {
        fetch(`${dbHost}/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(
                    'There has been a problem with your fetch operation:',
                    error
                );
            });
    }
    addOrUpdate(user: UserProps): void {
        console.log(this.get('id'));
        if (this.get('id') === user.id) {
            fetch(`${dbHost}/${this.get('id')}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! Status: ${response.status}`
                        );
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Updated user:', data);
                })
                .catch((error) => {
                    console.error(
                        'There has been a problem with your fetch operation:',
                        error
                    );
                });
        } else {
            fetch(`${dbHost}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('User added:', data);
                })
                .catch((error) => {
                    console.error(
                        'There has been a problem with your fetch operation:',
                        error
                    );
                });
        }
    }
}
