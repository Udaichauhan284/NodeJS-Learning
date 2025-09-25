/*
Async and await is JS are used to simplify handling asynchronous operations using promises. By enabling asynchronous code to 
appear synchronous, they enhance code readability and make it easier to manage complex asynchronous flows.

=> Async Function <=
The async function allows us to write promise-based code as if it were synchronous. This ensures that the execution thread is not blocked.
Async functions always return a promise. If a value is retured that is not a promise,
JS automatically wraps it in resolved promise.

=> Await function <=
The await keyword is used to wait for a promise to resolve, it can only be used within an async block. Await makes the code
wait until the promise return a result, allowing for cleaner and more manageable
asynchronous code.

const getData = async () => {
    let y = await "hello world";
    console.log(y);
}
console.log(1);
getData();
console.log(2);

o/p:
1
2
Hello World

-> async keyword transfrom a regular JS function into an asynchronous function, causing it to return a Promise.
-> await keyword is used inside an async function to pause its execution and wait for
a promise to resolve before continuing.
*/

function delay(time){
    return new Promise(resolve => setTimeout(resolve, time));
}

async function delayedGreet(name){
    await delay(200);
    console.log(name);
}

delayedGreet("Udai");

async function division(num1, num2){
    try{
        if(num2 === 0) throw new Error("Can not divide by 0");
        return num1/num2;
    }catch(err){
        console.log('error: ', err);
        return;
    }
}

async function mainOne(){
    console.log(await division(10,2));
    console.log(await division(10,0));
}
mainOne();