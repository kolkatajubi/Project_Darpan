var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Question = new Schema({
  id: String,
  url: String,
  question: String,
  votes: Number,
  description: String,
  answers: {
    votes: Number,
    answer: String
  }
});

Question.index({ question: 1 });
Question.index({ description: 1 });

module.exports = mongoose.model("Question", Question);
