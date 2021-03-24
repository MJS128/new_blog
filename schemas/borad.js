const mongoose = require("mongoose");

const { Schema } = mongoose;
const boradSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    pw: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    index: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true
    },    
});

module.exports = mongoose.model("borad", boradSchema);
