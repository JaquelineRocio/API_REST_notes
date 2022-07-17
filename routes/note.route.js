import {Router} from 'express';
import { getNotes, createNote, getNote, deleteNote } from '../controllers/note.controller.js';
import { requireToken } from '../middlewares/requireToken.js';

const noteRouter = Router();

//GET all notes
noteRouter.get("/", requireToken, getNotes);
//GET single note
noteRouter.get("/:id", requireToken,getNote)
//POST create note
noteRouter.post("/", requireToken, createNote);

//PATCH/PUT update note

//DELETE remove note
noteRouter.delete("/:id", requireToken, deleteNote);

export default noteRouter;