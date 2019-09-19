var mongoose = require("mongoose");
var User = require("./dbSchema");
mongoose.connect(
  "mongodb://localhost:27017/test1",
  { useNewUrlParser: true },
  function(err) {
    if (err) console.log("Mongoose Connect Error !!");
  }
);

module.exports = {
  search: search => {
    return new Promise((resolve, reject) => {
      var filter = {
        query_id: search
      };
      User.answer.find
        .sort({ votes: -1 })
        .limit(5)
        .toArray(filter, function(err, data) {
          if (err) {
            return reject({ status: "error", data: err });
          }
          console.log(filter);
          return resolve({ status: "success", data: data });
        });
    });
  },

  createQuery: user => {
    return new Promise((resolve, reject) => {
      var newQuestion = new User.query(user);
      newQuestion.save(function(err, data) {
        if (err) {
          return reject({ status: "error", data: err });
        }
        return resolve({ status: "success", data: data });
      });
    });
  },

  insertAnswer: insert => {
    return new Promise((resolve, reject) => {
      var newAnswer = new User.answer(user);
      newAnswer.save(function(err, data) {
        if (err) {
          return reject({ status: "error", data: err });
        }
        return resolve({ status: "success", data: data });
      });
    });
  }
};
