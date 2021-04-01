const jwt = require("jsonwebtoken");
const User = require("../models/user");

//미들웨어 기본 틀
module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ');

    if (tokenType !== "Bearer") {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세용',  //인증을 성공한 후 
        });
        return;
    }
    try { 
        const {userId} = jwt.verify(tokenValue, "my-secret-key");  //jwt토큰이 유효하면 
        User.findByPk(userId).then((user) => { //db에서 정보를 불러와서 
            res.locals.user = user; //여기에 넘김(?)
            next(); //호출
        }); 

    } catch (error) {  //try 구문 안에서 실행될 때 에러 발생시 잡아서 catch에 넘김
        res.status(401).send({
            errorMessage: '로그인 후 사용하세용',
        });
        return;        
    }
    
};