const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect("mongodb://localhost:27017/voyage", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .catch(err => console.log(err));
};
    mongoose.connection.on("error", err => {
        console.error("몽고디비 연결 에러", err);
    });
      
    module.exports = connect;