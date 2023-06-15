const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhost:418/events", event);
  axios.post("http://localhost:419/events", event);

  res.status(200).send("OK");
});

app.listen(421, () => {
  console.log("Event bus service running on port 421...");
});
