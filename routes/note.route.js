import {Router} from 'express';
import { newNote } from '../controllers/note.controller.js';

const routerNote = Router();

//GET all notes

//GET single note

//POST create notes
routerNote.post("/new-note",  newNote);

//PATCH/PUT update note

//DELETE remove note


export default routerNote;