const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

const url = `${BASE_URL}/1`;

async function getUser() {
    const result = await fetch(url);
    if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
    }
    const data = await result.json();
    return data;
}

async function fetchUserData() {
    const data = await getUser();
    // console.log(data?.address?.geo);
}

fetchUserData();

let colors = ['red', 'green', 'yellow', 'orange'];

// console.log(colors.at(-1));

let str = 'oops, oops, oops';
const ops = str.replaceAll('oops', 'rock');
// console.log(ops);

// Generators
function* evens(n: number) {
    while (true) {
        yield n;
        n += 2;
        console.log(n);
    }
}

function* fibonacci() {
    let a = 0,
        b = 1;

    while (true) {
        yield a;
        [a, b] = [b, a + b];
        console.log(a);
    }
}

const fib = fibonacci();
// fib.next()

const allImages = Array.from(
    { length: 5000 },
    (_, i) => `https://jsonplaceholder.typicode.com/photos/${i}`
);

function* getBatchOfImages(images: Array<string>, batchSize = 10) {
    let currIndex = 0;
    while (currIndex < images.length) {
        yield images.slice(currIndex, currIndex + batchSize);
        currIndex += batchSize;
    }
}

const imageGen = getBatchOfImages(allImages);
// console.log(imageGen.next().value);
// console.log(imageGen.next().value);
// console.log(imageGen.next().value);
// console.log(imageGen.next().value);

// Array.from('hello');
// Array.from({ length: 10 }, (el, idx) => idx);

// Factory function
function uniqueIdGen(prefix: string) {
    let id = 0;
    return () => {
        id += 1;
        console.log(`${prefix}${id}`);
        return `${prefix}${id}`;
    };
}

const getBookId = uniqueIdGen('book-');

// getBookId();
// getBookId();
// getBookId();
// getBookId();

function createExpFunc(exp: number) {
    return (val: number) => {
        console.log(val ** exp);
        return val ** exp;
    };
}

const square = createExpFunc(2);
// square(25);

// Timers

setTimeout(getBookId, 1000);
