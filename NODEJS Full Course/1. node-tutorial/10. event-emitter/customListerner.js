const EventEmitter = require("events");

class MyCustomEmitter extends EventEmitter{
    constructor(){
        super();
        this.greeting = 'Hello'
    }
    greet(name){
        this.emit("greeting", `${this.greeting}, ${name}`);
    }
}

const custom = new MyCustomEmitter();
custom.on("greeting", (input) => {
    console.log("Greeting Events: ", input);
});

custom.greet("Udai Chauhan");