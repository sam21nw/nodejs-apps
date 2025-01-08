function showNotification(message: string, duration: number) {
    const notification = document.createElement('DIV');
    notification.innerText = message;
    notification.className = 'notification';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, duration);
}

// showNotification('signed in', 1000);
// showNotification('oops', 3000);
// showNotification('signed out', 6000);

// Start the interval
// const id = setInterval(() => {
//     console.log('oops');
// }, 1000);

// // Clear the interval after 5 seconds (5000 milliseconds)
// setTimeout(() => {
//     clearInterval(id);
//     console.log('Interval cleared');
// }, 5000);

// Debouncing
function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: number;

    return function (this: any, ...args: Parameters<T>) {
        clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

function queryApi(str: string): void {
    console.log('Making an API request!!! ' + str);
    fetch(`https://jsonplaceholder.typicode.com/comments/${str}`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json.body);
            showNotification(json.body, 10000);
        });
}

const searchInput = document.querySelector<HTMLInputElement>('#search');

if (searchInput) {
    const debouncedQueryApi = debounce(queryApi, 700);

    searchInput.addEventListener('input', (e: Event) => {
        const target = e.target as HTMLInputElement;
        debouncedQueryApi(target.value);
    });
}
