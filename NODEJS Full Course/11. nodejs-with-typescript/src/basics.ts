console.log('Welcome to Nodejs with typescript');

//Basic Type
let isDone : Boolean = true; //Boolean type
let num : number = 10; //Number type
let str : string = "Hello"; //string type
let list : number[] = [1,2,3]; //array of number
let names : string[] = ["udai", "sandesh"]; //array of string

//also we can do like this way
let products : Array<string> = ['laptop', 'mobile', 'fridge'];

let randomType : any = 4; //this will work
randomType = "string hai"; //still work
randomType = true; //still work for boolean
randomType = ["udai", 89]; //still work for multiple types

let notValue = undefined; //or
let notValu1 : undefined = undefined;

let nullValue = null; //OR
let nullValue1 : null = null;

enum Color {
    Red, Green, Blue
}; //we have predefined the color enum that when someone use this, they only have these 3 options

let d : Color = Color.Blue; //or green or Red

//Tuple
let tupleExmple : [string, number] = ["hi", 400];

//Interface types
interface User{
    name : String;
    id : number;
    email? : string; //with question mark this is optional
    readonly createdAt: Date
}

//lets create the user
const user : User = {
    name : "udai",
    id : 1,
    createdAt : new Date(),
}
console.log('this is user: ', user);

//after this we can also give email, if we give or not, it dosenot matter because we created email as optional
const user1 : User = {
    name : "Sandesh",
    id : 2,
    createdAt : new Date(),
    email : "sandesh@yahoo.com"
}
console.log('this is another user: ', user1);

type Product = {
    title : string,
    price : number,
}
//now use that type
const product : Product = {
    title : 'Product 1',
    price : 200
}
console.log("this is type product 1: ", product);

//function with type annotataions, in these we can initialize the parameter type and also type of returning function
function multiple(a:number, b:number):number{
    return a*b;
}
console.log('This is value of multiple func: ', multiple(5,8));

//arrow function
const add = (num1 : number, num2 : number) : number => {
    return num1 + num2;
}
console.log('this is add arrow function: ', add(8,9));

//pass the optional parameter
function greet(name : string, greeting? : string) : string {
    return `Hey ${name}, ${greeting}`
}
console.log(greet("Udai"));
console.log(greet("Udai", "Big Man"));