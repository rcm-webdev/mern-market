const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    signs:[{
        type: mongoose.Schema.Types.ObjectId,
        //tell mongoose that this is a reference to the sign model
        ref: "Sign",
    }]
}, { timestamps: true });

//create a user model with this schema
module.exports = mongoose.models.User || mongoose.model("User", userSchema);