import mongoose, {Document, Schema, model} from 'mongoose';

export interface StudentInterface extends Document {
    identification: Number, 
    name: String,
    lastNames: String,
    program: mongoose.Types.ObjectId,
    created_at: Date,
}

const StudentSchema = new Schema<StudentInterface>({
    identification: {
        type: Number, 
        required: true, 
    }, 
    name: {
        type: String, 
        required: true,  
    },
    lastNames: {
        type: String, 
        required: true, 
    }, 
    program: {
        type: Schema.ObjectId, 
        ref: "Program" 
    },
    created_at: {
        type: Date, 
        default: Date.now
    }
})

export default model("Student", StudentSchema)