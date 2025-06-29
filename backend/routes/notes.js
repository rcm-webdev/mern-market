const express = require("express");
const router = express.Router();
//controllers are used to handle the logic of the routes
const { getNotes, getNoteById, createNote, updateNote, deleteNote } = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getNotes).post("/", protect, createNote)

router.get("/:id", protect, getNoteById).put("/:id", protect, updateNote).delete("/:id", protect, deleteNote)


module.exports = router;