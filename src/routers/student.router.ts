import {Router} from "express";
const studentRouter = Router();
import {Student} from "../schemas/student.schemas";
import multer from 'multer';
const upload = multer();

studentRouter.get('/create',(req, res)=>{
    res.render("createBook");
});


studentRouter.post('/create', upload.none(), async (req, res)=>{
    try{
        const studentNew = new Student(req.body);
        const student = await studentNew.save();
        if(student){
            res.redirect("list");
        }else {
            res.render("error");
        }
    }catch (err){
        res.render("error");
    }
});




studentRouter.post('/update', upload.none(), async (req, res)=>{
    try{
        const student = await Student.findOne({_id:req.body.id});
        student.name = req.body.name;
        student.codeStudent = req.body.codeStudent;
        student.theoreticalPoint = req.body.theoreticalPoint;
        student.practicePoints = req.body.practicePoints;
        student.status = req.body.status;
        student.evaluate = req.body.evaluate;
        student.class = req.body.class;
        await student.save();
        if(student){
            res.redirect("list");
        }else {
            res.render("error");
        }
    }catch (err){
        res.render("error");
    }
});


studentRouter.get('/update/:id', async (req, res)=>{
    try {
        const student = await Student.findOne({_id: req.params.id});
        console.log(student, 'book')
        if(student){
            res.render("updateBook", {student:student})
        }else {
            res.render("error");
        }
    }catch (err){
        res.render("error")
    }
});


studentRouter.delete('/delete/:id', async (req, res)=>{
    try {
        const student = await Student.findOne({_id:req.params.id});
        if(student){
            await student.remove();
            res.status(200).json({message: "success"});
        }else {
            res.render("error");
        }
    }catch (err){
        res.render("error")
    }
});

studentRouter.get('/list', async (req, res)=>{
    try {
        const students = await Student.find();
        res.render("listBook", {students: students});
    }catch (err){
        res.render("error")
    }
});


studentRouter.get('/detail/:id',async (req, res)=>{
    try {
        const students = await Student.findOne({_id:req.params.id})
        res.render("detailBook", {students:students});
    }catch (err){
        res.render("error")
    }
});


export default studentRouter;