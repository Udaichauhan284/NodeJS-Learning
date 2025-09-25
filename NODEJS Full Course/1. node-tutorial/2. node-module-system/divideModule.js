const divideMethod = require("./index");

try{
    console.log("Trying to divide it by 0");
    let result = divideMethod.divide(100,2);
    console.log('Divide result :',result);
}catch(error){
    console.log("Caught an error-> ", error.message);
}

//Module wrapper, first nodejs wrapper your module code in wrapper functions
// {
//     function(exports, require, module, __filename, __dirname){
//         //your module code goes here
//     }
// }