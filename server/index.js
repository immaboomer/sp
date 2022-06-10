var express = require("express"); //To include all express file
var app = express();
var cors = require("cors");
var database = require("./database");
var port = process.env.PORT || 3001;

const bodyParser = require("body-parser");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // return json response
database.connect((err) => {
  if (err) throw err;
});

app.listen(port, () => {
  console.log("Connected to port :", port);
});

app.get("/hello", (req, res) => {
  qu = "select * from sample;";
  database.query(qu, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/createStudent", (req, res) => {
  console.log(req.body);
  qu =
    "insert into sample values ('" +
    req.body.roll +
    "','" +
    req.body.name +
    "');";
  database.query(qu, (err, result) => {
    if (!err) {
      res.json(result);
    }
  });
});

app.post("/deleteStudent", (req, res) => {
  qu = "delete from sample where rollNo = '" + req.body.roll + "';";
  database.query(qu, (err, result) => {
    if (err) {
      // res.json(result);
      console.log(err);
    }
  });
});

app.post("/updateStudent", (req, res) => {
  qu =
    "update sample set stuName = '" +
    req.body.name +
    "' where rollNo = '" +
    req.body.roll +
    "';";
  console.log(qu);
  database.query(qu, (err, result) => {
    if (err) {
      // res.json(result);
      console.log(err);
    }
  });
});
