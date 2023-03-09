"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    name: String,
    codeStudent: String,
    theoreticalPoint: Number,
    practicePoints: Number,
    status: String,
    evaluate: String,
    class: String,
});
const Student = (0, mongoose_1.model)('Student', bookSchema);
exports.Student = Student;
//# sourceMappingURL=student.schemas.js.map