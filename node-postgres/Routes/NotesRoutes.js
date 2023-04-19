const express = require('express');
const { 
    findAllNotes, 
    findById, 
    updateNotes, 
    addNotes 
} = require("../Controllers/NotesController");

const router = express.Router();

router.get('/', findAllNotes);
router.get('/:notesId', findById);
router.post('/', addNotes);
router.post('/:notesId', updateNotes);

module.exports = router;