var mongoose = require("mongoose");
var User = require("./dbSchema");
mongoose.connect(
  "mongodb://localhost:27017/jubiSolutions",
  { useNewUrlParser: true },
  function(err) {
    if (err) console.log("Mongoose Connect Error !!");
  }
);

module.exports = {
  searchByQueryId: search_ID => {
    try {
      return new Promise((resolve, reject) => {
        var filter = {
          query_id: search_ID
        };
        User.answer
          .find(filter, { ans_id: 0, votes: 0 }, function(err, data) {
            if (err) {
              return reject({ status: "error", data: err });
            }
            console.log(filter);
            return resolve({ status: "success", data: data });
          })
          .sort({ votes: -1 })
          .limit(5);
      });
    } catch (err) {
      console.log("error in Search by Query" + err);
    }
  },

  search_Question_ID: searchKey => {
    try {
      return new Promise((resolve, reject) => {
        var filter = {
          url: 0,
          question: 0,
          $text: { $search: searchKey }
        };
        var score = { score: { $meta: "textScore" } };
        User.query
          .find(filter, score, (limit = 5), function(err, data) {
            if (err) {
              return reject({ status: "error", data: err });
            }
            console.log(filter);
            return resolve({ status: "success", data: data });
          })
          .sort({ score: { $meta: "textScore" } });
      });
    } catch (err) {
      console.log(
        "error in search_By_description method with Error code " + err
      );
    }
  }

  // createQuery: user => {
  //   return new Promise((resolve, reject) => {
  //     var newQuestion = new User.query(user);
  //     newQuestion.save(function(err, data) {
  //       if (err) {
  //         return reject({ status: "error", data: err });
  //       }
  //       return resolve({ status: "success", data: data });
  //     });
  //   });
  // }

  // insertAnswer: insert => {
  //   return new Promise((resolve, reject) => {
  //     var newAnswer = new User.answer(user);
  //     newAnswer.save(function(err, data) {
  //       if (err) {
  //         return reject({ status: "error", data: err });
  //       }
  //       return resolve({ status: "success", data: data });
  //     });
  //   });
  // }
};
