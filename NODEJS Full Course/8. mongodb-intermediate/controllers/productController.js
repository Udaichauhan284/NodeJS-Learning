const Product = require("../models/Product");

const insertSampleProducts = async (req, res) => {
    try{
        const sampleProducts = [
        {
            name: "Laptop",
            category: "Electronics",
            price: 999,
            inStock: true,
            tags: ["computer", "tech"],
        },
        {
            name: "Smartphone",
            category: "Electronics",
            price: 699,
            inStock: true,
            tags: ["mobile", "tech"],
        },
        {
            name: "Headphones",
            category: "Electronics",
            price: 199,
            inStock: false,
            tags: ["audio", "tech"],
        },
        {
            name: "Running Shoes",
            category: "Sports",
            price: 89,
            inStock: true,
            tags: ["footwear", "running"],
        },
        {
            name: "Novel",
            category: "Books",
            price: 15,
            inStock: true,
            tags: ["fiction", "bestseller"],
        },
    ];
    //now push the mulitple data into the db
    const result = await Product.insertMany(sampleProducts);
    res.status(201).json({
        success : true,
        messsage : `Data is saved in DB successfully. Length of data ${result.length}`,
        data : result,
    })
    }catch(e){
        console.error(e);
        res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
};

//now use the aggregrator
const getProductStats = async (req, res) => {
    try{
        const result = await Product.aggregate([
        {
            //stage 1
            $match: {
            inStock: true,
            price: {
                $gte: 100,
            },
            },
        }
        ]);

        res.status(200).json({
            success : true,
            data : result,
        });

    }catch(e){
        console.error(e);
        res.status(500).json({
            success : false,
            message : "Something went wrong!"
        })
    }
};  

module.exports = {insertSampleProducts, getProductStats};