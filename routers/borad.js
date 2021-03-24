const express = require("express");
const borad = require("../schemas/borad");
const router = express.Router();

//api/borad를 요청할때
router.get("/borad", async (req, res, next) => {
  try {
    const { number } = req.query; //number를 쿼리로 요청한다
    const borad = await borad.find({ title }).sort("-number"); //borad는 title를 number로 정렬한다
    res.json({ borad: borad });
} catch (err) {
    console.error(err);
    next(err);
  }
});


router.get("/borad/:number", async (req, res) => { // 
  const { number } = req.params;
  borad = await borad.findOne({ number: number });
  res.json({ detail: number });
});

module.exports = router;