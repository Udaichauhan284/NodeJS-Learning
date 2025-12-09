const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

//event listener
client.on("error", (error) => {
  console.log("Redis Client Error Occurred!", error);
});

const redisDataStructure = async () => {
  try {
    //initially setup the connection
    await client.connect();

    //For Strings -> we have SET, GET, MSET, MGET
    await client.set("name", "udai chauhan");
    //console.log("Getting the name: ", await client.get("name"));

    //now use of MSET, setting multiple strings, also we need to set in array
    await client.mSet([
      "user:name",
      "udai chauhan",
      "user:email",
      "udai@email.com",
      "user:age",
      "26",
      "user:location",
      "Finland",
    ]);

    //now getting the data
    const [name, email, age, location] = await client.mGet([
      "user:name",
      "user:email",
      "user:age",
      "user:location",
    ]);
    //console.log("Details of User info: ", name, email, age, location);

    //LISTS --> LPUSH, RPUSH, LRANGE, LPOP, RPOP
    //await client.lPush("notes", ["note 1", "note 2", "note 3", "note 4"]); //pushing the nodes into left side
    //const extractAllNotes = await client.lRange("notes", 0, 1); //need to iterate from to zero to index, if -1 means till last
    //console.log("This is node: ", extractAllNotes);

    //Now using of lPop, means pop from left
    //const firstNode = await client.lPop("notes");
    //console.log("The left node:", firstNode);
    //let remainigNodes = await client.lRange("notes", 0, -1);
    //console.log("After lpop: ", remainigNodes);

    //SETS ->  SADD, SMEMBERS, SISMEMBER, SREM
    //await client.sAdd("users", ["udai", "sandesh", "ajay"]);
    //const allUsers = await client.sMembers("users");
    //console.log("All Members: ", allUsers);

    //Adding only one user after creation of users
    //await client.sAdd("users", "john");
    //console.log("After Add: ", await client.sMembers("users")); //showing all the users ["udai", "sandesh", "ajay", "john"];

    //now using the checking method
    //let isUser = await client.sIsMember("users", "udai");
    //console.log("Getting the users: ", isUser); //return 1, means true

    //Now I am removing the one user from user set
    //const removedOne = await client.sRem("users", "john");
    //console.log("Removed one: ", removedOne); //Return 1, means done

    //Now we learn about the Sorted Set, ZADD, ZRANGE, ZRANK, ZREM
    /*await client.zAdd("cart", [
            {
                score : 100,
                value : "Cart 1",
            },
            {
                score : 150,
                value : "Cart 2"
            },
            {
                score : 10,
                value : "Cart 3"
            }
        ]);*/

    // const allCartItemsASC = await client.zRange("cart", 0, -1);
    // console.log("All Cart Items: ", allCartItemsASC);

    // const allCartWithScores = await client.zRangeWithScores("cart", 0, -1);
    // console.log("This is with score: ", allCartWithScores);

    // const cartTwoRank = await client.zRank("cart", "Cart 2");
    // console.log(cartTwoRank);

    // const cartThreeRank = await client.zRank("cart", "Cart 3");
    // console.log("Cart 3 Rank: ", cartThreeRank);

    // ==> Redis Hashes <==
    /* Reids hashed are record type structured as collections of field-value pairs. */
    const product = await client.hSet("bike:1", {
        model: "Deimos",
        brand: "Ergonom",
        type: "Enduro bikes",
        price: 4972,
    });

    const getProduct = await client.hGet("bike:1", "model");
    console.log("Get Product Model: ", getProduct);

    const getAllProduct = await client.hGetAll("bike:1");
    console.log("Get All Product: ", getAllProduct);

    const getArrayProduct = await client.hmGet("bike:1", ['model', 'price']);
    console.log("All array: ", getArrayProduct);

    //we can also increase field value
    const increasePrice = await client.hIncrBy("bike:1", "price", 100);
    console.log("Increase value: ", increasePrice);

    const decreasePrice = await client.hIncrBy("bike:1", "price", -100);
    console.log("After Delete by 100: ", decreasePrice);
    } catch (err) {
    //need to log the error, if we face any in try block
    console.log(err);
    } finally {
    //need to quit the open connection
    client.quit();
    }
};

//calling the function here, so we can check what we have written
redisDataStructure();
