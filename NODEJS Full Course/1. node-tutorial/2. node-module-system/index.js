//module.exports means exporting the contents

//require -> means import the particular module in this file, these are follows the CommonJS

const sum = (a,b) => {
    return a+b;
}

const subtract = (a,b) => {
    return a-b;
}

const divide = (a,b) => {
    if(b === 0){
        throw new Error(":Divide by zero is not allowed");
    }
    return a/b;
}

//now i will export the contents
module.exports = {
    add:sum, subtract, divide
}