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
    try{
        //now read the book body from req body
        const newBook = req.body;
        const newlyBookCreated = await Book.create(newBook);
        if(newlyBookCreated){
            res.status(201).json({
                success : true,
                message : "Book added successfully",
                data : newlyBookCreated,
            });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : "Something wnt wrong! Please try again",
        });
    }
};

const updateBook = async(req, res) => {
    try{
        const updateBookFormData = req.body;
        const getCurrentId = req.params.id;
        const updateBook = await Book.findByIdAndUpdate(getCurrentId, updateBookFormData, { new : true, });

        if(!updateBook){
            return res.status(404).json({
                success: false,
                message : "book is not found with this ID",
            });
        }

        res.status(200).json({
            success : true,
            message : "Book Update successfully",
            data : updateBook,
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Something went wrong! Pease try again",
        });
    }
};

const deleteBook = async (req, res) => {
    try{
        const getCurrentId = req.params.id;
        const deleteBook = await Book.findByIdAndDelete(getCurrentId);
        if(!deleteBook){
            return res.status(404).json({
                success : false,
                message : "Book is not found with this ID",
            });
        }

        res.status(200).json({
            success : true,
            data : deleteBook,
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Something went wrong! Please try again",
        });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    addNewBook,
    updateBook,
    deleteBook
};