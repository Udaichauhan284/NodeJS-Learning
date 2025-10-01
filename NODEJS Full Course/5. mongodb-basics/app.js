
const mongoose = require("mongoose");
//now connent with the database
mongoose.connect("mongodb+srv://udaichauhan284:udaichauhan284@cluster-mongodb.ltkgeip.mongodb.net/")
.then(() => console.log("Database connected succesfully"))
.catch((e) => console.log(e));

//now for saving the data into db, we need to save it in form of schema, so mongoose will gives the schema functionality
/*
Schema -> blueprint (structure) of your data
it define what fields a document will have and thier types
*/
const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    age : Number,
    isActive : Boolean,
    tags : [String],
    createdAt : {type : Date, default : Date.now}
});

/* Models -> actual object you use to interact with the database.
-> Its created from a schema and lets you create, read, update, delete documents in MongoDB.

Schema => rules/structure
Model => tool to work with documents in DB.
*/
//create user model
const User = mongoose.model('User', userSchema);

async function runQueryExamples(){
    try{
        //create a new documents
        //create function will create new User in DB
        // const newUser = await User.create({
        //     name : "udai chauhan",
        //     email : "udaichauhan@gmail.com",
        //     age : 26,
        //     isActive : true,
        //     tags : ["developer"],
        // });

        //-> we can also create the simply calling User and then defining it and use of save
        // const newUser = new User({
        //     name: "Raj Mukherjee",
        //     email: "raj@gmail.com",
        //     age: "40",
        //     isActive: true,
        //     tags: ["developer", "designer", "manager"],
        // });
        // //now use of save method
        // await newUser.save();

        //console.log("Create new users: ", newUser);

        //-> Now Getting all user
        const allUsers = await User.find({});
        console.log('This is all users: ', allUsers);
    }catch(e){
        console.log('Error -> ', e);
    }finally{
        await mongoose.connection.close(); //this is method to close the connection
    }
}

runQueryExamples();