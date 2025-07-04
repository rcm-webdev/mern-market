const mongoose = require("mongoose");

const slideshowSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    slides: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slide",
    }],
    displayCode: {
        type: String,
        required: true,
    },
    settings: {
        type: Object,
        default: {},
    },
}, { timestamps: true });   

//create a slideshow model with this schema
const Slideshow = mongoose.model("Slideshow", slideshowSchema);

module.exports = Slideshow;