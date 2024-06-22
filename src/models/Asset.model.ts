import {Document, Schema, model} from 'mongoose'; 

interface AuthorInterface extends Document {
    name: String,
    dateOfBirth: Date, 
    placeOfBirth: String,
}

export interface AssetInterface extends Document {
    asset: String,
    publicationDate: Date,
    image: String,
    author: AuthorInterface,
    created_at: Date,
}

const AuthorSchema = new Schema<AuthorInterface>({
    name: {
        type: String, 
        required: true, 
    }, 
    dateOfBirth: {
        type: Date, 
        required: true,
    }, 
    placeOfBirth: {
        type: String, 
        required:  true,
    }
})

const AssetSchema = new Schema<AssetInterface>({
    asset: {
        type: String, 
        required: true,
    },
    publicationDate: {
        type: Date, 
        required: true,
    },
    image: {
        type: String, 
        default: 'default.png'
    }, 
    author: {
        type: AuthorSchema, 
        required: true, 
    }, 
    created_at: {
        type: Date, 
        default: Date.now
    }
}); 

export default model("Asset",AssetSchema);