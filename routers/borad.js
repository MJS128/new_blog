const express = require("express");
const { Mongoose } = require("mongoose");
const borad = require("../schemas/borad");
const Borad = require("../schemas/borad");

const router = express.Router();

//api/borad를 요청할때 
router.post("/borad", async function (req, res, next) {
  try {
    const {title, content, author, pw} = req.body;
    all_borad = await Borad.find({}).sort("-id")
    console.log(all_borad)
    if(all_borad.length == 0){id = 1}
    else{id = all_borad[0]['id']+1}
    await Borad.create({author,title,content,pw,id})
    res.send({result:"success"})
} catch (err) {
    console.error(err);
    next(err);
  }
});

//전체게시글 조회
router.get("/borad", async function (req, res, next) {
  try {
    // const { number } = req.query; //number가 있으면
    const board = await Borad.find({ }).sort("-id"); //Borad를 가져와서 mongodb에서 Borad를 찾는다. number기준으로
    console.log(board)
    res.json({ Borad: board }); //내려줄때는 json형식으로(조건에 맞는 )

} catch (err) {
    console.error(err);
    next(err);
  }
});

//상세페이지 보여주기
router.get("/borad/:boradId", async (req, res) => {
    const { boradId } = req.params;
  borad_show = await Borad.findOne({ id: boradId });
  res.json({ borad_detail: borad_show });
});


//삭제
router.delete("/borad/:boradId", async (req, res) => {
  const { boradId } = req.params;
  const { pw } = req.body;
  console.log(pw)
  const borad = await Borad.findOne({ id : boradId })
  if (borad['pw'] == pw) {
    await Borad.deleteOne({ id: boradId })
    res.send({ result: "success" })
  } else {
    res.send({result:"fail"})
  }
});

//수정
router.patch("/borad/:boradId", async function(req, res) {
  const { boradId } = req.params;
  const { pw } = req.body;

  const borad = await Borad.findOne({ id : boradId })
  if (borad['pw'] == pw) {
    await Borad.findOneAndUpdate({ id: boradId })
    res.send({ result: "success" })
  } else {
    res.send({result:"fail"})
  }
});


module.exports = router;