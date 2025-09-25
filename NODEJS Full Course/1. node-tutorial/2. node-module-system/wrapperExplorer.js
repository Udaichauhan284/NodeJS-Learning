/* In Node.js, a module wrapper is a function that "encapsulates" the code of each module before execution, providing a private scope for the module's variable and functions.

This wrapper function has the following structure:
{
    function(exports, require, module, __filename, __dirname){
        //module code actually lives in here
    }
}
*/

console.log("Node module wrapper code demo");

console.log("__filename in wrapper explorer", __filename);
console.log("__dirname in wrapper explorer", __dirname);

module.exports.greet = function(name){
    console.log(`Hello ${name}`);
}