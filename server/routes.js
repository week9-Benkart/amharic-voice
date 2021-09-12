const express = require("express");
const router = express.Router();
const { responseFailure, responseSuccess } = require("./response");
var multer = require('multer');

// router.post("/audio", async (req, res) => {
//   console.log(req.body);
// });

const upload = multer({dest:'uploads/'}).single("wavFile");
router.post("/audio", (req, res) => {
   upload(req, res, (err) => {
    if(err) {
      res.status(400).send("Something went wrong!");
    }
    res.send(req.file);
  });
});

router.get("/transcription", async (req, res) => {
  let result = "አገራችን ከአፍሪካም ሆነ ከሌሎች የአለም አገራት ጋር ያላትን አለም አቀፋዊ ግንኙነት ወደ ላቀ ደረጃ ያሸጋገረ ሆኗል በአገር ውስጥ አራት አለም ጀልባያውም የወረቀት"
  return res.json(responseSuccess(null, result));
});

module.exports = router;
