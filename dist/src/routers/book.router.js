"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookRouter = (0, express_1.Router)();
const book_schemas_1 = require("../schemas/book.schemas");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
bookRouter.get('/create', (req, res) => {
    res.render("createBook");
});
bookRouter.post('/create', upload.none(), async (req, res) => {
    try {
        const bookNew = new book_schemas_1.Book(req.body);
        const book = await bookNew.save();
        if (book) {
            res.redirect("list");
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
bookRouter.post('/update', upload.none(), async (req, res) => {
    try {
        const book = await book_schemas_1.Book.findOne({ _id: req.body.id });
        book.title = req.body.title;
        book.description = req.body.description;
        book.author = req.body.author;
        await book.save();
        if (book) {
            res.redirect("list");
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
bookRouter.get('/update/:id', async (req, res) => {
    try {
        const book = await book_schemas_1.Book.findOne({ _id: req.params.id });
        console.log(book, 'book');
        if (book) {
            res.render("updateBook", { book: book });
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
bookRouter.delete('/delete/:id', async (req, res) => {
    try {
        const book = await book_schemas_1.Book.findOne({ _id: req.params.id });
        if (book) {
            await book.remove();
            res.status(200).json({ message: "success" });
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
bookRouter.get('/list', async (req, res) => {
    try {
        const books = await book_schemas_1.Book.find();
        res.render("listBook", { books: books });
    }
    catch (err) {
        res.render("error");
    }
});
bookRouter.get('/detail', async (req, res) => {
    try {
        const books = await book_schemas_1.Book.findOne({ _id: req.body.id });
        res.render("detailBook", { books: books });
    }
    catch (err) {
        res.render("error");
    }
});
exports.default = bookRouter;
//# sourceMappingURL=book.router.js.map