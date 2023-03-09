"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    name: String,
    codeStudent: String,
    theoreticalPoint: Number,
    practicePoints: Number,
    status: String,
    evaluate: String,
    class: String
});
const Book = (0, mongoose_1.model)('Book', bookSchema);
exports.Book = Book;
//# sourceMappingURL=book.schemas.js.map