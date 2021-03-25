const express = require('express');
const app = express();
const port = 3000
const connect = require("./schemas");
connect();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'));


const boradRouter = require("./routers/borad");
app.use("/api", [boradRouter]);

app.use('/',(req,res,next)=>{
    console.log(req)
    next();
});




app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app.use('/board', boardRouter);

app.use((req, res, next) => {
    
    next();
});

app.get('/', (req, res) => {
    res.render('index');
})


app.get('/fun', (req, res) => {
    res.render('fun');
})


app.get('/borad', (req, res) => {
    res.render('borad')
})


app.get('/borad/write', (req, res) => {
    res.render('write')
})

app.get('/borad/read', (req, res) => {
    res.render('read')
})

// app.get('/borad/check', (req, res) => {
//     res.render('read')
// })

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})