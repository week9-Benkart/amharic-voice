const bodyParser = require("body-parser");
const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express();

port = process.env.PORT || 8000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
    ],
    exposedHeaders: ["auth-token"],
  }));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use("/api", routes);


app.get("/test", (req, res) => {
  res.json("working");
});

app.listen(port, () => {
  console.log(`app active on ${port}`);
});




