import {Schema, model} from "mongoose";

interface IStudent{
    name: string;
    codeStudent: string;
    theoreticalPoint: number;
    practicePoints: number;
    status: string;
    evaluate: string;
    class: string;
}

const bookSchema = new Schema<IStudent>({
    name: String,
    codeStudent: String,
    theoreticalPoint: Number,
    practicePoints: Number,
    status: String,
    evaluate: String,
    class: String,
})

const Student = model<IStudent>('Student', bookSchema);

export {Student};