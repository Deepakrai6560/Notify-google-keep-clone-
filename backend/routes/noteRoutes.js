const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const auth = require('../middleware/auth');

// Create a new note
router.post('/', auth, noteController.createNote);
// Get all notes for a user
router.get('/', auth, noteController.getNotes);
// Get a specific note
router.get('/:id', auth, noteController.getNote);
// Update a note
router.put('/:id', auth, noteController.updateNote);
// Delete a note
router.delete('/:id', auth, noteController.deleteNote);

// toggle archieve note
router.patch('/:id',auth, noteController.toggleArchive);

// toggle trash note

router.patch('/trash/:id',auth, noteController.toggleTrash);


module.exports = router;
