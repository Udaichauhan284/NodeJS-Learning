//Package.json - it build by npm init- measn we are first initializing the node project, this is the first step - it ensure the list of packages with their version.
// Analogy: list of cloth i want ot purchase with size and all, it will give the bill of that size , price and all and also consist some meta darta.

//Package-lock.json - ensure detailed of every package installed with versionm sub dependencies, store details, discount and all, real world analogy.
//Both files work together to ensure the smooth developement for your project

//Callback Function
// function callback(){
//     console.log("this is a callback function");
// }
// function add(a,b, fun1){
//   let result = a+b;
//   console.log(result);
//   fun1();
// }
// add(4,5, ()=>{
//   console.log("Callback function, add completed");
// });

//Some functioality of Node js
// const fs = require('fs');
// const os = require('os');
// console.log(os.userInfo().username);

//file name, data of file, callback function
// fs.appendFile('greeting.txt', "Hello " + os.userInfo().username, ()=>{
//   console.log("File is created");
// });

//Import and Export
const notes = require("./notes"); //Hello from Notes
console.log("Hello from server"); //Hello from Server

console.log("Age from notes " + notes.age);

console.log("Add of Two Number " + notes.addTwoNumber(notes.age,10));
