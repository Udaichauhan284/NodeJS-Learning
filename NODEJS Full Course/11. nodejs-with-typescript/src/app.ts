//Here we have to use import and export, because we are using the es6

import express, {Express, Request, Response, NextFunction} from "express";
import {IUser, User} from "./models/User";

const app : Express = express();
const port = 3000;

//use of middleware
app.use(express.json());

//middleware -> add startTime to request
interface CustomRequest extends Request{
    startTime?:  number;
}

app.use((req : CustomRequest, res : Response, next : NextFunction) => {
    req.startTime = Date.now(),
    next();
});

/* req -> type Request (paras, ResBody, ReqBody, ReqQuery, someLocals)
*/
app.get("/", (req : Request, res : Response) => {
    res.send('Hello Nodejs with Typescript');
});

//creating route for IUser, User
app.get("/users", async (req: Request, res: Response) => {
    try{
        const users : IUser[] = await User.find();
        console.log('this is users: ', users);
        res.status(200).json({
            message : "This is your data",
            data : users
        })
    }catch(err){
        res.status(400).json({message : "Some error occured!"});
    }
});

//Here creating the user property -> name and email, post route -> new user, req.body
// -> /user/:id?name -> Request <{}, {ResBody}, {ReqBody}, {ReqQuery}, {somelocals}>

//see in Request , reqBody we need to give the type of User, so for that we need to create the interface
interface User {
    name : String,
    email : String,
}

app.post("/user", (req: Request<{}, {}, User>, res : Response) => {
    //get the name and email from req.body
    const {name, email} = req.body;
    res.json({
        message : `User created ${name}-${email}`,
    });
});

//getting user based on id
app.get("/user/:id", (req: Request<{id: String}>, res: Response) => {
    const {id} = req.params;
    res.json({
        userId : id,
    });
});

app.listen(port, () => {
    console.log(`Server is up and running on ${port}`);
});