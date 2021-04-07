const express = require('express');
const router = express.Router();
const noteCtrl = require('../controllers/noteController');

router.get("/notes" , noteCtrl.getAllNotes);
router.post("/notes/save" , noteCtrl.saveNotes);
router.put("/notes/update" , noteCtrl.updateNote);
router.delete("/notes/delete/:noteId" , noteCtrl.deleteNote);


module.exports = router