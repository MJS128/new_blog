const express = require("express");
const { Mongoose } = require("mongoose");
const Board = require("../schemas/board");
//const board = require("../schemas/board");

const router = express.Router();

//api/board를 요청할때 
router.post("/board", async function (req, res, next) {
  try {
    const {title, content, author, pw} = req.body;
    all_board = await Board.find({}).sort("-id")
    
    if(all_board.length == 0) {id = 90}
    else { id = all_board[0]['id'] + 1 }
    
    await Board.create({ author, title, content, pw, id })
    
    res.send({result:"success"})
} catch (err) {
    console.error(err);
    next(err);
  }
});

//전체게시글 조회
router.get("/board", async function (req, res, next) {
  try {
    // const { number } = req.query; //number가 있으면
    const board = await Board.find({ }).sort("-id"); //board를 가져와서 mongodb에서 board를 찾는다. number기준으로
    res.json({ Board: board }); //내려줄때는 json형식으로(조건에 맞는 )

} catch (err) {
    console.error(err);
    next(err);
  }
});

//상세페이지 보여주기
router.get("/board/:boardId", async (req, res) => {
    const { boardId } = req.params;
    
  board_show = await Board.findOne({ id: boardId });
  res.json({ board_detail: board_show });
});


//삭제
router.delete("/board/:boardId", async (req, res) => {
  const { boardId } = req.params;
  const { pw } = req.body;
  
  const board = await Board.findOne({ id : boardId })
  if (board['pw'] == pw) {
    await Board.deleteOne({ id: boardId })
    res.send({ result: "success" })
  } else {
    res.send({result:"fail"})
  }
});

//수정
router.put("/board/:boardId", async (req, res) => {
  const { boardId } = req.params;
  const { pw } = req.body;
  console.log(req.params)
  const board = await Board.findOne({ id : boardId })

  if (board['pw'] == pw) {

  res.send({ result: "success" })

} else {
  res.send({result:"fail"})
}
});
   
router.post("/board/edit/:boardId", async (req, res) => {
  try{
  const { boardId } = req.params;
  const { title, content } = req.body;

 await Board.findByIdAndUpdate({ _id: boardId }, {$set: {title, content }} )

 res.send({ result: "success" })

  } catch(e) {
    console.log(e)
    res.send({ result: "fali" })
  }
})




module.exports = router;