//First need to import the redis
const redis = require('redis');

//need to create client from redis, this client is used to interact with redis
const client = redis.createClient({
    host : 'localhost',
    port : 6379
});

//event listener
client.on("error",(error) => {
    console.log("Redis Client Error occured!", error);
});

//now we will stepup the connection, using the async function, async why, because the connection will take time, so atleast excute the other things
async function testRedisConnection() {
    try{
        //setuping the connection
        await client.connect();
        console.log("Connected To Redis 👍");

        //now i am setting the key and value into redis
        await client.set("name", "udai chauhan");
        //now i want to get the data
        const extractValue = await client.get("name");
        console.log("This is get value from server: ", extractValue);

        //now i am deleting the key which is my name, so del method will return the number of deleted key
        const deletedCount = await client.del("name");
        console.log("Count of deleted key: ", deletedCount);

        //now i want to extract the del key value
        const afterDelete = await client.get("name");
        console.log("After delete of name key: ", afterDelete);

        //Now using the incre and decre logic, first set the key and value
        await client.set("count", 100);

        //now use the increment
        const incrementValue = await client.incr("count");
        console.log("After increment: ", incrementValue);

        //increasing 2 times
        await client.incr("count");
        await client.incr("count");

        const getAfter2Times = await client.get("count");
        console.log("This is after two times: ", getAfter2Times);

        //now use of decrement
        const afterDecrement = await client.decr("count");
        console.log("After deletion operations: ", afterDecrement);

    }catch(err){
        //in this need to throw the error
        console.log(err);
    }finally{
        await client.quit(); //need to quit the connection, so its good to not leave any other active connection
    }
}

testRedisConnection();