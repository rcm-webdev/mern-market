const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    layout: {
        type: String,
        required: true,
    },
    cssTemplate: {
        type: String,
        required: true,
    },
});

//create a template model with this schema
const Template = mongoose.model("Template", templateSchema);

module.exports = Template;