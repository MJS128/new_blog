const express = require("express");
const router = express.Router();
const { Mongoose } = require("mongoose");
const app = express();
const port = 3000
const connect = require("./schemas");
connect();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'));




// 강의자료
// mongoose.connect("mongodb://localhost/voyage", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));


app.use('/',(req,res,next)=>{
  console.log(req)
  next();
});
app.use("/api", express.urlencoded({ extended: false }), router);
app.use(express.static("assets")); 


// 강의자료
const User = require("./models/user");


// 회원가입 API
router.post("/users", async (req, res) => {
  const { email, nickname, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).send({
      errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
    });
    return;
  }

  // email or nickname이 동일한게 이미 있는지 확인하기 위해 가져온다.
  const existsUsers = await User.findOne({
    $or: [{ email }, { nickname }],
  });
  if (existsUsers) {
    // NOTE: 보안을 위해 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses
    res.status(400).send({
      errorMessage: "이메일 또는 닉네임이 이미 사용중입니다.",
    });
    return;
  }

  const user = new User({ email, nickname, password });
  await user.save();

  if (res.send({result:"success"})) {
}else {
  res.send({result:"fail"})
}

});

//강의자료
const jwt = require("jsonwebtoken");

router.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // NOTE: 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses
  if (!user || password !== user.password) {
    res.status(400).send({
      errorMessage: "이메일 또는 패스워드가 틀렸습니다.",
    });
    return;
  }

  res.send({
    token: jwt.sign({ userId: user.userId }, "my-secret-key"),
  });
});

//강의자료
const auth_Middleware = require("./middlewares/auth_middleware");

router.get("/users/me", auth_Middleware, async (req, res) => {
  res.send({ user: res.locals.user });
});//강의자료


const boardRouter = require("./routers/board");
app.use("/api", [boardRouter]);






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

app.get('/login', (req, res) => {
  res.render('login');
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
