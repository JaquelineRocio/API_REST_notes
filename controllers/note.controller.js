import {Note} from "../models/Note.js";

export const getNotes = async (req, res) =>{
   try {
    console.log('dd', req.uid)
        const notes = await Note.find({uid: req.uid})
        
        return res.json({notes})
    
   } catch (error) {
    return res.status(500).json({error: 'error de servidor'})
   }
}

export const createNote = async (req, res)=>{
    
    try{
        
        const {title, author, text, status} = req.body;
        let note = new Note({title, author, text, status, uid: req.uid});
        const newNote = await note.save()

        return res.status(201).json({newNote})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error: 'error de servidor'})
    }
}