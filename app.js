const express = require("express");
const mongoose = require("mongoose");
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

// Configuring Mongoose
const mongoUrl = process.env.MONGODB_URI + "/deepbot" || "mongodb://localhost:27017/deepbot";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, '[-] Connection error'));
const questionSchema = new mongoose.Schema({
  question: String,
  author: String
});
const QuestionModel = mongoose.model("Question", questionSchema);

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
  const question = req.body.text;
  const author = req.body.user_name;

  // ADD QUESTION TO DATABASE
  const newQuestion = new QuestionModel({
    question, author
  });
  newQuestion.save((err, newQuestion) => { if (err) throw err; });

  res.send({
    response_type: "in_channel",
    text: `New question added by ${author}! ${question}`
  })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("[+] Bot server is running...");
});
