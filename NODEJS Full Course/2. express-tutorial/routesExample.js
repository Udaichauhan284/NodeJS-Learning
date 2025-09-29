const express = require("express");
const app = express();

//root route
app.get("/",(req, res) => {
    res.send("Welcome to our home page");
});

//get all products
app.get("/products", (req, res) => {
    const products = [
        {
            id : 1,
            label : "Product 1"
        },
        {
            id : 2,
            label : "Product 2"
        },
        {
            id : 3,
            label : "Product 3"
        }
    ];
    res.json(products);
});

//get only particular product
app.get("/products/:id", (req, res) => {
    const products = [
        {
            id : 1,
            label : "Product 1"
        },
        {
            id : 2,
            label : "Product 2"
        },
        {
            id : 3,
            label : "Product 3"
        }
    ];

    //now getting the id from params
    const getId = parseInt(req.params.id);

    //now getting the product from product object
    const getSingleProduct = products.find(product => product.id === getId);
    if(getSingleProduct){
        res.json(getSingleProduct);
    }else{
        res.status(404).send('product is not found!, please try with other id');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server chl rha hai ${port}`);
});