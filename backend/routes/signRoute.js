const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { uploadMiddleware, handleMulterError } = require("../config/multer");
const { getSigns, createSign, updateSign, deleteSign } = require("../controllers/signController");

//localhost:2121/api/signs
router.get("/", protect, getSigns);

//localhost:2121/api/signs
router.post("/", protect, uploadMiddleware.single("image"), handleMulterError, createSign);

//localhost:2121/api/signs/:id
router.put("/:id", protect, updateSign);

//localhost:2121/api/signs/:id
router.delete("/:id", protect, deleteSign);

module.exports = router;