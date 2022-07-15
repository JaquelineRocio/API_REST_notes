import {Router} from 'express';
import { getNotes, createNote } from '../controllers/note.controller.js';
import { requireToken } from '../middlewares/requireToken.js';

const noteRouter = Router();

//GET all notes
noteRouter.get("/", requireToken, getNotes);
//GET single note

//POST create note
noteRouter.post("/", requireToken, createNote);

//PATCH/PUT update note

//DELETE remove note


export default noteRouter;