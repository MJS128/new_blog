const mongoose = require("mongoose");

const { Schema } = mongoose;
const BoardSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    pw: {
        type: String,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    author:{
        type:String,
    },
    create_date :{
        type : Date,
        default : Date.now
    }
});


module.exports = mongoose.model("board", BoardSchema);
