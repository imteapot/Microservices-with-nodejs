const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const db = {};

app.get("/ads", (req, res) => {
  res.send(db);
});

app.post("/ads", async (req, res) => {
  const id = uuidv4();
  const message = req.body.message;

  db[id] = {
    id,
    message,
  };

  await axios.post("http://localhost:421/events", {
    type: "AdCreated",
    data: {
      id,
      message,
    },
  });

  res.status(201).send(db[id]);
});

app.post("/events", (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
});

app.listen(418, () => {
  console.log("ads service running on port 418...");
});
