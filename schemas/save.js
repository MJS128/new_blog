const mongoose = require("mongoose");

const { Schema } = mongoose;
const saveSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  pw: {
    type: Number,
    required: true,
    unique: true    
  },
  index: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },  
});

module.exports = mongoose.model("save", saveSchema);