"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentRouter = (0, express_1.Router)();
const student_schemas_1 = require("../schemas/student.schemas");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
studentRouter.get('/create', (req, res) => {
    res.render("createBook");
});
studentRouter.post('/create', upload.none(), async (req, res) => {
    try {
        const studentNew = new student_schemas_1.Student(req.body);
        const student = await studentNew.save();
        if (student) {
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
studentRouter.post('/update', upload.none(), async (req, res) => {
    try {
        const student = await student_schemas_1.Student.findOne({ _id: req.body.id });
        student.name = req.body.name;
        student.codeStudent = req.body.codeStudent;
        student.theoreticalPoint = req.body.theoreticalPoint;
        student.practicePoints = req.body.practicePoints;
        student.status = req.body.status;
        student.evaluate = req.body.evaluate;
        student.class = req.body.class;
        await student.save();
        if (student) {
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
studentRouter.get('/update/:id', async (req, res) => {
    try {
        const student = await student_schemas_1.Student.findOne({ _id: req.params.id });
        console.log(student, 'book');
        if (student) {
            res.render("updateBook", { student: student });
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
studentRouter.delete('/delete/:id', async (req, res) => {
    try {
        const student = await student_schemas_1.Student.findOne({ _id: req.params.id });
        if (student) {
            await student.remove();
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
studentRouter.get('/list', async (req, res) => {
    try {
        const students = await student_schemas_1.Student.find();
        res.render("listBook", { students: students });
    }
    catch (err) {
        res.render("error");
    }
});
studentRouter.get('/detail/:id', async (req, res) => {
    try {
        const students = await student_schemas_1.Student.findOne({ _id: req.params.id });
        res.render("detailBook", { students: students });
    }
    catch (err) {
        res.render("error");
    }
});
exports.default = studentRouter;
//# sourceMappingURL=student.router.js.map