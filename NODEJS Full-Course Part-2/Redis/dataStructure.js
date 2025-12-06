const redis = require("redis");

const client = redis.createClient({
    host : "localhost",
    port : 6379
});

//event listener
client.on("error", (error) => {
    console.log("Redis Client Error Occurred!", error);
});

const redisDataStructure = async () => {
    try{
        //initially setup the connection
        await client.connect();

        //For Strings -> we have SET, GET, MSET, MGET
        await client.set("name", "udai chauhan");
        //console.log("Getting the name: ", await client.get("name"));


        //now use of MSET, setting multiple strings, also we need to set in array
        await client.mSet([
            "user:name", "udai chauhan",
            "user:email", "udai@email.com",
            "user:age", "26",
            "user:location", "Finland"
        ]);

        //now getting the data
        const [name, email, age, location] = await client.mGet(["user:name", "user:email", "user:age", "user:location"]);
        //console.log("Details of User info: ", name, email, age, location);

        //LISTS --> LPUSH, RPUSH, LRANGE, LPOP, RPOP



    }catch(err){
        //need to log the error, if we face any in try block
        console.log(err);
    }finally{
        //need to quit the open connection
        client.quit();
    }
}

//calling the function here, so we can check what we have written
redisDataStructure();