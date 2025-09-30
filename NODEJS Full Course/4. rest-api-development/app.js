const express = require("express");
const app = express();

//middleware
app.use(express.json());

let books=[
    {
        id:"1",
        title : "Book 1"
    },
    {
        id : "2",
        title : "Book 2"
    },
    {
        id : "3",
        title : "Book 3"
    }
];

//intor rouet
app.get("/", (req, res) => {
    res.json({
        message : "Welcome to Books APIs",
    });
});

//get all books
app.get("/books", (req, res) => {
    res.json(books);
});

//get the single book
app.get("/books/:id", (req, res) => {
    const getId = req.params.id;
    const getBook = books.find(b => b.id === getId);
    if(getBook){
        res.status(200).json(getBook);
    }else{
        res.status(404).json({
            message : "Book not found! Please try with a different BOOK ID",
        });
    }
});

//add a new book
app.post("/add", (req, res) => {
    const newBook = {
        id : Math.floor(Math.random() * 1000).toString(),
        title : `Book ${Math.floor(Math.random() * 1000)}`
    };

    books.push(newBook);
    res.status(201).json({
        data: newBook,
        message : "New Book is added successfully"
    });
});

//update teh book
app.put("/update/:id", (req, res) => {
    const findCurrentBook = books.find(b => b.id === req.params.id);

    //now i want to update the title of book fro, req body
    if(findCurrentBook){
        findCurrentBook.title = req.body.title || findCurrentBook.title;

        res.status(200).json({
            message : `Book ID ${req.params.id} updated successfully`,
            data : findCurrentBook
        });
    }else{
        res.status(404).json({
            message : "Book not found",
        });
    }
});

//delete the book
app.delete("/delete/:id", (req, res) => {
    //we will delete that book id using the index and use of splice method
    const findIndexOfCurrentBook = books.findIndex(item => item.id === req.params.id);

    if(findIndexOfCurrentBook !== -1){
        const deletedBook = books.splice(findIndexOfCurrentBook, 1);
        res.status(200).json({
            message : "Book Deleted successfully",
            data : deletedBook[0]
        });
    }else{
        res.status(404).json({
            message : "Book not found",
        });
    }
});


//start the server
const PORT = 3000;
app.listen(PORT, (req, res) => {
    console.log(`Server is Running on ${PORT}`);
});