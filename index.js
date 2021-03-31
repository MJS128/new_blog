const express = require('express');
const router = express.Router();
const { Mongoose } = require("mongoose");
const app = express();
const port = 3000
const connect = require("./schemas");
connect();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'));


const boardRouter = require("./routers/board");
app.use("/api", [boardRouter]);

const userRouter = require("./models/user");
app.use("/api", [userRouter]);

app.use('/',(req,res,next)=>{
    next();
});

// const User = require("./models/user");

// // 회원가입 API
// router.post("/users", async (req, res) => {
//   try {
//   const { email, nickname, password, confirmPassword } = req.body;

//   if (password !== confirmPassword) {
//     res.status(400).send({
//       errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
//     });
//     return;
//   }

//   // email or nickname이 동일한게 이미 있는지 확인하기 위해 가져온다.
//   const existsUsers = await User.findOne({
//     $or: [{ email }, { nickname }],
//   });
//   if (existsUsers) {
//     res.({result:"success"})
//       errorMessage: "이메일 또는 닉네임이 이미 사용중입니다.",
//     });
//     return;
//   }
//   const user = new User({ email, nickname, password });
//   await user.create({ email, nickname, password, });
    
//     res.send({result:"success"})
// } catch (err) {
//     console.error(err);
//     next(err);
//   }



// const jwt = require("jsonwebtoken");

// router.post("/auth", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   // NOTE: 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses
//   if (!user || password !== user.password) {
//     res.status(400).send({
//       errorMessage: "이메일 또는 패스워드가 틀렸습니다.",
//     });
//     return;
//   }

//   res.send({
//     token: jwt.sign({ userId: user.userId }, "my-secret-key"),
//   });
// });

// const authMiddleware = require("./middlewares/auth-middleware");
// const user = require('./models/user');

// router.get("/users", authMiddleware, async (req, res) => {
//   res.send({ user: res.locals.user });
// });

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app.use('/board', boardRouter);

app.use((req, res, next) => {
    next();
});

app.get('/', (req, res) => {
    res.render('index');
})



app.get('/board', (req, res) => {
    res.render('board')
})


app.get('/board/write', (req, res) => {
    res.render('write')
})

app.get('/board/read', (req, res) => {
    res.render('read')
})

app.get('/board/edit', (req, res) => {
    res.render('edit');
})

app.get('/index/user', (req, res) => {
    res.render('user');
})

app.get('/index/login', (req, res) => {
  res.render('login');
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})