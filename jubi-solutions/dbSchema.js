var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var answerSchema = new Schema({
  query_id: String,
  ans_id: String,
  votes: String,
  answer: String
});

var querySchema = new Schema({
  query_id: String,
  url: String,
  question: String,
  votes: String,
  description: String
});

querySchema.index({ question: 1 });
querySchema.index({ description: 1 });
answerSchema.index({ votes: -1 });
answerSchema.index({ query_id: 1 });

var answer = mongoose.model("answerSchema", answerSchema);
var query = mongoose.model("querySchema", querySchema);

module.exports = {
  answer: answer,
  query: query
};
