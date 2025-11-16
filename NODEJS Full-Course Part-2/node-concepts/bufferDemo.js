//Objects -> handle binary data
//file system operations, cryptographu, image processing

const buffOne = Buffer.alloc(10); //allocate a buffer of 10 bytes -> zeros.
console.log(buffOne);

const buffFromString = Buffer.from("Hello");
console.log(buffFromString);

const buffFromArrayOfInt = Buffer.from([1,2,3]);
console.log(buffFromArrayOfInt);

//now giving the string to buffOne 
buffOne.write("Node JS");
console.log("After writing string to buffOne: ", buffOne.toString());


//read a buff from a string 
console.log(buffFromString[0]);

//using of slice method
console.log(buffFromString.slice(0,3));

//concating the buffer
const concatBuffs = Buffer.concat([buffOne, buffFromString]);
console.log('concat of buffer: ', concatBuffs);

//change buffer to json
console.log(concatBuffs.toJSON());