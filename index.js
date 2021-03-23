const express = require('express')
const app = express()
const port = 3000

const boardRouter = require('./routes/board');

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    console.log(req);
    next();
});

app.use('/board', boardRouter);

app.use((req, res, next) => {
    console.log(req);
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


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})