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