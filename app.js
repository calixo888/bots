const express = require("express");
const mongodb = require("mongodb");
const cookieParser = require("cookie-parser");

const app = express()

// Configuring cookie parser with express
app.use(cookieParser())

// Setting JSON parsing methods for POST request data
app.use(express.urlencoded()); // HTML forms
app.use(express.json()); // API clients

// Setting view rendering engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/static', express.static(__dirname + '/static'))
app.engine('html', require('ejs').renderFile);

// Configuring MongoDB
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;
const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017";

app.get("/", (req, res) => {
  res.send("bots boi")
});

// DEEPBOT
app.post("/deepbot/deepquestion", (req, res) => {
  res.send({
    response_type: "in_channel",
    text: "Currently under development..."
  });
});

app.post("/deepbot/addquestion", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  res.send({
    response_type: "in_channel",
    text: `New question added! ${req.body.text}`
  })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("[+] Bot server is running...");
});
