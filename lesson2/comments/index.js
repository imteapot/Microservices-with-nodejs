const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const commentsDB = {};

app.get("/ads/:id/comments", (req, res) => {
  res.send(commentsDB[req.params.id]);
});

app.post("/ads/:id/comments", async (req, res) => {
  const id = uuidv4();
  const comment = req.body.comment;

  const comments = commentsDB[req.params.id] || [];

  comments.push({ id, comment });

  commentsDB[req.params.id] = comments;

  await axios.post("http://localhost:421/events", {
    type: "CommentCreated",
    data: {
      id,
      comment,
      adId: req.params.id,
    },
  });

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
});

app.listen(419, () => {
  console.log("Comments service running on port 419...");
});
