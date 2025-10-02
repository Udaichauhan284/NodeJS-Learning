const mongoose = require("mongoose");
//now connent with the database
mongoose.connect(
    "mongodb+srv://udaichauhan284:udaichauhan284@cluster-mongodb.ltkgeip.mongodb.net/")
.then(() => console.log("Database connected succesfully"))
.catch((e) => console.log(e));

//now for saving the data into db, we need to save it in form of schema, so mongoose will gives the schema functionality
/*
Schema -> blueprint (structure) of your data
it define what fields a document will have and thier types
*/
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String],
    createdAt: { type: Date, default: Date.now },
});

/* Models -> actual object you use to interact with the database.
-> Its created from a schema and lets you create, read, update, delete documents in MongoDB.

Schema => rules/structure
Model => tool to work with documents in DB.
*/
//create user model
const User = mongoose.model("User", userSchema);

async function runQueryExamples() {
    try {
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
    // const allUsers = await User.find({});
    // console.log('This is all users: ', allUsers);

    //-> Now get user which are isActive
    // const getActiveUser = await User.find({isActive : true});
    // console.log("Active user: ", getActiveUser);

    //->now get the specific user using the findOne method
    // const getOneUser = await User.findOne({name : 'Raj Mukherjee'});
    // console.log('One user: ', getOneUser);

    //-> now get the user by it id
    //so for this need to create the user first
    // const newUser = await User.create({
    //     name: "Updated User",
    //     email: "updated@gmail.com",
    //     age: "75",
    //     isActive: true,
    //     tags: ["developer"],
    // });
    // const getLastCreatedUserByUserId = await User.findById(newUser._id);
    // console.log("This is created now: ", getLastCreatedUserByUserId);

    //now get the selected fields
    // const selectedFields = await User.find().select("name email -_id");
    // console.log("Selected Fields: ", selectedFields);

    //-> Now i want only 5 data and skip one
    // const limitedUser = await User.find().limit(5).skip(1);
    // console.log("Limited User: ", limitedUser);

    //Now i will sort the data on base of age in ascending order
    // const sortData = await User.find().sort({age : 1});
    // console.log("This is sort data: ", sortData);

    //-> now i want to count the data which is isActive true
    // const countDocuments = await User.countDocuments({isActive : true});
    // console.log("This is counted data: ", countDocuments);

    //-> Now I want to delete the data from database
    // const deleteduser = await User.findByIdAndDelete({_id : '68de32077d758cfc17f1ef75'});
    // console.log("This is deleted: ", deleteduser);

    //-> Now i want to update the data into database
    const updateUser = await User.findByIdAndUpdate({_id : '68de31d31ad523c30d1f7241'}, {
        $set : {age : 100},
        $push : {tags : "updated"},
    },
{
    new : true //this we need to write to inform it that it is new document and return it
});
console.log("Updated the User: ", updateUser);
    } catch (e) {
        console.log("Error -> ", e);
    } finally {
        await mongoose.connection.close();      //this is method to close the connection
    }
}

runQueryExamples();
