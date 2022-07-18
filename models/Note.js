import mongoose from "mongoose";

const {Schema, model} = mongoose;

const noteSchema = new mongoose.Schema({
    title: String,
    text: String,
    date: {
        type: Date,
        default: Date.now
    },
    status: String,
    uid:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

export const Note = mongoose.model('Note', noteSchema);