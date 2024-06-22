import mongoose, {Document, Schema, model} from 'mongoose';

export interface LoansInterface extends Document {
    student: mongoose.Types.ObjectId, 
    asset: mongoose.Types.ObjectId, 
    period: Date, 
    created_at: Date
}

const LoansSchema = new Schema<LoansInterface>({
    student: {
        type: Schema.ObjectId, 
        ref: "Student"
    }, 
    asset: {
        type: Schema.ObjectId, 
        ref: "Asset"
    },
    period: {
        type: Date, 
        default: () => {
            let currentDate = new Date(); 
            currentDate.setDate(currentDate.getDate() + 10);
            return currentDate
        }
    },
    created_at:{
        type: Date, 
        default: Date.now
    }, 

}); 

export default model("Loan", LoansSchema);