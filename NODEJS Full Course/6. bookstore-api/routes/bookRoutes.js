const express = require("express");

//now call all the controller which hold the functionality what to do with db data, get, update n all.
const {
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    addNewBook,
} = require("../controllers/bookController");

const router = express.Router();

//now all routes that are related to books only, this will help to interacte with application and database
router.get("/get", getAllBooks);
router.get("/get/:id", getBookById);
router.post("/add", addNewBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;
