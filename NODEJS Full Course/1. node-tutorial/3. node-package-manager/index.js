const lodash = require("lodash");

const names = ["udai", "nitin", "sandesh", "angela"];

//using lodash i will captialize the first letter of all names
const captialize = lodash.map(names, lodash.capitalize);

console.log("This is after the captialize function: ", captialize);