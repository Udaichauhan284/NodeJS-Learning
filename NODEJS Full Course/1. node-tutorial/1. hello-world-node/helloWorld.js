console.log("Hello JS, Node JS");
const arr = [1,2,3,4];
console.log('This is array: ', arr);

setTimeout(() => {
    console.log("This message is delayed by 2 seconds")
}, 2000);

console.log("After the settimeout, but this will run first");