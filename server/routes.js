const express = require("express");
const router = express.Router();
const { responseFailure, responseSuccess } = require("./response");
var multer = require('multer');

var storage = multer.diskStorage({   
   destination: function(req, file, cb) { 
      cb(null, './uploads');    
   }, 
   filename: function (req, file, cb) { 
      cb(null , file.originalname);   
   }
});

var upload = multer({ storage: storage }).single("wavFile");

router.post("/audio", (req, res) => {
   upload(req, res, (err) => {
    if(err) {
      return res.json(responseFailure("Audio have not been received", 400));
    }
    return res.json(responseSuccess('Data Received'));
  });
});

router.get("/transcription", async (req, res) => {
  let result = "አገራችን ከአፍሪካም ሆነ ከሌሎች የአለም አገራት ጋር ያላትን አለም አቀፋዊ ግንኙነት ወደ ላቀ ደረጃ ያሸጋገረ ሆኗል በአገር ውስጥ አራት አለም ጀልባያውም የወረቀት"
  return res.json(responseSuccess(null, result));
});

module.exports = router;
