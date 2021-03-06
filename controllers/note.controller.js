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

export const getNote = async (req, res) =>{
    try {
        const {id} = req.params;
        const note = await Note.findById(id);
        if(!note) return res.status(404).json({error: 'No existe la nota'})
        console.log(note.uid, req.uid)
        if(!note.uid.equals(req.uid)) return res.status(401).json({error: 'No le pertenece el id'})
        return res.json({note})
    } catch (error) {
        console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(403).json({error: 'Formato id incorrecto'})
        }
        return res.status(500).json({error: 'error de servidor'});
    }
}

export const createNote = async (req, res)=>{
    
    try{
        
        const {title, text, status} = req.body;
        let note = new Note({title, text, status, uid: req.uid});
        const newNote = await note.save()

        return res.status(201).json({newNote})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error: 'error de servidor'})
    }
}

export const deleteNote = async (req, res) =>{
     console.log(req.id)
    try {
        const {id} = req.params;
        const note = await Note.findById(id);
        if(!note) return res.status(404).json({error: 'No existe la nota'})
        
        if(!note.uid.equals(req.uid)) return res.status(401).json({error: 'No le pertenece el id'})
        note.remove();
        return res.json({note})
    } catch (error) {
        console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(403).json({error: 'Formato id incorrecto'})
        }
        return res.status(500).json({error: 'error de servidor'});
    }
}
export const updateNote = async (req, res) =>{
   try {
       const {id} = req.params;
       const {title, text, status} = req.body;
       const note = await Note.findById(id);
       if(!note) return res.status(404).json({error: 'No existe la nota'})
       
       if(!note.uid.equals(req.uid)) return res.status(401).json({error: 'No le pertenece el id'})

       note.title  = title || note.title;
       note.text = text || note.text;
       note.status = status || note.status;
       await note.save();

       return res.json({note})
   } catch (error) {
       console.log(error);
       if(error.kind === "ObjectId"){
           return res.status(403).json({error: 'Formato id incorrecto'})
       }
       return res.status(500).json({error: 'error de servidor'});
   }
}