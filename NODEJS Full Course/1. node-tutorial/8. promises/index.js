/*
Promises can help in avoiding the callback hell by providing the structred way to 
handle the asynchronous opertions using the 
.then() method. Due to which the code becomes
more readable by avoiding the deeply nested callbacks.
*/

function delayFn(time){
    return new Promise((resolve) => setTimeout(resolve, time));
}

// console.log("Promise lecture starts");
// delayFn(2000).then(() => console.log("after 2 seconds promise"));
// console.log("end");

function divideFn(num1, num2){
    return new Promise((resolve, reject) => {
        if(num2 === 0){
            reject('Can not perform this divide');
        }else{
            resolve(num1/num2);
        }
    })
}

divideFn(10,0).then(result => console.log(result)).catch(err => console.log(err));