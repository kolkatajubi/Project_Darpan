var db = require("./dbSearch");

// Dependencies
const express = require("express");
const app = express();

const bodyparser = require("body-parser");

// Defining Path for URL Re-routes
var path = require("path");

// Body Parser will parse the HTML and return it in non-encoded format
app.use(
  bodyparser.urlencoded({
    extended: false
  })
);

// Body Parser will parse the HTML and return it in JSON format
app.use(bodyparser.json());

// Defining IP-Address and PORT number
const ipaddress = "127.0.0.1";
const port = 3125;

// Listening to the IP-Address:PORT number
app.listen(port, ipaddress, () =>
  console.log(`Listening at ${ipaddress}:${port}...`)
);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontPage.html");
});

app.post("/search", async (req, res) => {
  console.log("search post called..");
  res.json(await db.search(req.body.search_ID));
});

app.post("/createQuery", async (req, res) => {
  console.log("create query");
  res.json(await db.createQuery(req.body));
});

app.post("/newAnswer", async (req, res) => {
  console.log("new answer insert");
  res.json(await db.insertAnswer(req.body));
});
