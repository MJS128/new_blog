const mongoose = require("mongoose");

const { Schema } = mongoose;
const boradSchema = new Schema({
    id: {
        type: Number,
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
    content: {
        type: String,
        required: true,
    },
    author:{
        type:String,
        required:true
    },
    create_date :{
        type : Date,
        default : Date.now
    }
});


module.exports = mongoose.model("borad", boradSchema);
