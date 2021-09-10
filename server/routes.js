const express = require("express");
const router = express.Router();
const { responseFailure, responseSuccess } = require("./response");


router.post("/audio", async (req, res) => {
  const { error } = userPostValidation(req.body);
  if (error) {
    return res.status(400).json(responseFailure(error.details[0].message, 400));
  }
  console.log(req.body);
});

router.get("/transcription", async (req, res) => {
  let result = "አገራችን ከአፍሪካም ሆነ ከሌሎች የአለም አገራት ጋር ያላትን አለም አቀፋዊ ግንኙነት ወደ ላቀ ደረጃ ያሸጋገረ ሆኗል በአገር ውስጥ አራት አለም ጀልባያውም የወረቀት"
  return res.json(responseSuccess(null, result));
});

module.exports = router;
