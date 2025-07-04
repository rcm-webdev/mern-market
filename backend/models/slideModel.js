const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Template",
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
});

//create a slide model with this schema
const Slide = mongoose.model("Slide", slideSchema);

module.exports = Slide;