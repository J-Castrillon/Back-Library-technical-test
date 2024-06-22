import { Document, Schema, model } from "mongoose";

export interface ProgramInterface extends Document {
    name: String,
    created_at: Date
}

const ProgramSchema = new Schema<ProgramInterface>({
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default model("Program", ProgramSchema);