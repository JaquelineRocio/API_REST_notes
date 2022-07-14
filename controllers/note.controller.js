import {Note} from "../models/Note.js";

export const newNote = async (req, res)=>{
    const {title, author, text, status} = req.body;
    
    try{
        let note = new Note({title, author, text, status});
        await note.save()

        return res.status(201).json({ok: true})
    }
    catch(error){
        console.log(error);
    }
}