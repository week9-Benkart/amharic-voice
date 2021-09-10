const bodyParser = require("body-parser");
const express = require("express");
const routes = require("./routes");

const app = express();

port = process.env.PORT || 8000;

app.use("/api", routes);

app.use(bodyParser.json());

app.use(
  cors({
    origin: [
      "http://127.0.0.1:8000",
    ],
    exposedHeaders: ["auth-token"],
  })
);

app.get("/test", (req, res) => {
  res.json("working");
});

app.listen(port, () => {
  console.log(`app active on ${port}`);
});




