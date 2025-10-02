//now in this controller i will wirte the working functionality so that view can interact with models so that it can access the database and perform the action

const Book = require("../models/book");

//Now controller for getting all books
const getAllBooks = async (req, res) => {
    try{
        const allBooks = await Book.find({});
        if(allBooks?.length > 0){
            res.status(200).json({
                success : true,
                message : "List of Books fetched successfully",
                data : allBooks
            });
        }else{
            res.status(404).json({
                success : false,
                message : "No Books found in collection",
            });
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message : "Something went wrong! please try again",
        });
    }
};

//Now controller for getting a single book by id
const getBookById = async (req, res) => {
    try{
        const getCurrentId = req.params.id;
        const bookDetailsById = await Book.findById(getCurrentId);
        if(!bookDetailsById){
            return res.status(404).json({
                success : false,
                message : "Book with the current ID is not found! Please try with different ID"
            });
        }
        res.status(200).json({
            success : true,
            data : bookDetailsById
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Something went wrong! Please try again",
        });
    }
};

//Controller for adding the book into the DB
const addNewBook = async (req, res) => {
    
};

module.exports = {
    getAllBooks,
    getBookById
}