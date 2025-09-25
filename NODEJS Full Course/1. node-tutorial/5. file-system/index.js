
const fs = require("fs");
const path = require("path");

//now we will create the folder in this filesystem folder using the fs mkdir and also create the file

const datafolder = path.join(__dirname, "data");

if(!fs.existsSync(datafolder)){
    //if datafolder is not present in folder
    fs.mkdirSync(datafolder);
    console.log("Data folder is created");
}

//now in that folder we will create the file
const filePath = path.join(datafolder, "example.txt");

if(!fs.existsSync(filePath)){
    //this is how we create file in sync method, by blocking the code
    fs.writeFileSync(filePath, "Hello this is created from index js file"); //this is how you should create the file with filePath name and data for that file
    console.log("File is created in data");
}

//now we will read the file
const readContentOfFile = fs.readFileSync(filePath, "utf-8"); //we will give the filePath name and method in which we want to read
console.log("File Content: ", readContentOfFile);

//if we want to append in the file
// fs.appendFileSync(filePath, " This is appended char");

const readingAfterAppend = fs.readFileSync(filePath, "utf-8");
console.log("Content after reading: ", readingAfterAppend);


console.log("------------------------");
//using async method to create the folder and file
const asyncFilePath = path.join(datafolder, "asyncExample.txt");

//now writing the file or add async way
fs.writeFile(asyncFilePath, "Hello, This is Async Method of creating the file", (err) => {
    if(err) throw err;
    console.log("Async file is created done");
});

//now using the async method to read file
fs.readFile(asyncFilePath, "utf-8", (err, data) => {
    if(err) throw err;
    console.log("Async file content: ", data);
});

//now i want to append the file and in that only i want to read the file

fs.appendFile(asyncFilePath, "\nThis is another line we have added using async method", (err) => {
    if(err) throw err;
    console.log("The new line is added using the async method");

    //now in this only i want to read file
    fs.readFile(asyncFilePath, "utf-8", (err, data) => {
        if(err) throw err;
        console.log("Update file data read: ", data);
    });
});
