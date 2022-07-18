import {Router} from 'express';
import { getNotes, createNote, getNote, deleteNote, updateNote } from '../controllers/note.controller.js';
import { requireToken } from '../middlewares/requireToken.js';
import { paramsNoteValidator } from '../middlewares/validationManager.js';

const noteRouter = Router();

//GET all notes
noteRouter.get("/", requireToken, getNotes);
//GET single note
noteRouter.get("/:id", requireToken,getNote)
//POST create note
noteRouter.post("/", requireToken, createNote);

//PATCH/PUT update note
noteRouter.patch("/:id", requireToken, paramsNoteValidator, updateNote);

//DELETE remove note
noteRouter.delete("/:id", requireToken, paramsNoteValidator, deleteNote);

export default noteRouter;