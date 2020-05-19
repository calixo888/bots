const express = require("express");
const mongodb = require("mongodb");

const app = express()
const MongoClient = mongodb.MongoClient;

app.get("/", (req, res) => {
  res.send("bots boi")
});

app.post("/dailyquestion", (req, res) => {
  res.send({
    response_type: "in_channel",
    text: "Currently under development..."
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("[+] Bot server is running...");
});
