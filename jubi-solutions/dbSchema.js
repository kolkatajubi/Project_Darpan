var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Query = new Schema({
  id: String,
  url: String,
  question: String,
  votes: Number,
  description: String,
  answers: [
    {
      votes: Number,
      answer: String
    }
  ]
});

Query.index({ question: 1 });
Query.index({ description: 1 });

module.exports = mongoose.model("Query", Query);
