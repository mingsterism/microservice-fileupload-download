const express = require("express");
const app = express();
var path = require("path");
var cors = require("cors");
var request = require("request"); // to use browser and download?

var Busboy = require("busboy");

const { URI, PORT } = process.env;

const mongodb = require("mongodb");
const ObjectID = require("mongodb").ObjectID;

const MongoClient = mongodb.MongoClient;
console.log("Environment variables: ", process.env);

const port = PORT;
const uri = URI;
// ("mongodb+srv://tintinthong:H-i5JBrKh-Xp3%21-@cluster0-duqpt.mongodb.net/test?retryWrites=true");
const client = new MongoClient(uri, { useNewUrlParser: true });

// //handle cross origin requiues
// function handleCors(req, res, callback) {

//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Authorization');

//     // CORS OPTIONS request, simply return 200
//     if (req.method == 'OPTIONS') {
//         res.statusCode = 200;
//         res.end();
//         callback.onOptions();
//         return;
//     }

//     callback.onContinue();
// };

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // * => allow all origins
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,OPTIONS,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Auth-Token, Accept"
  ); // add remove headers according to your needs
  next();
});

// app.use(cors())

//connect  to db
let db;

client.connect(err => {
  if (err) {
    console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
  }
  db = client.db("Cluster0");
});

app.get("/", function(req, res, bucket) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/postFile", (req, res, bucket) => {
  var bucket = new mongodb.GridFSBucket(db);
  const busboy = new Busboy({ headers: req.headers });
  req.pipe(busboy);
  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    file
      .pipe(bucket.openUploadStream(filename))
      .on("error", err => {
        console.error("ERROR: ", err);
      })
      .on("finish", () => {
        console.log("DONE");
      });
  });

  // Listen for event when Busboy is finished parsing the form.
  busboy.on("finish", function() {
    res.statusCode = 200;
    res.json({ statusCode: 200 });
  });

  // Pipe the HTTP Request into Busboy.
});

app.get("/listFiles", (req, res) => {
  var bucket = new mongodb.GridFSBucket(db);
  bucket
    .find({})
    .toArray()
    .then(data => {
      console.log("Data", data);
      res.send(data);
    });
});

app.get("/getFile", function(req, res) {
  const { id } = req.query;
  var bucket = new mongodb.GridFSBucket(db);
  const bucketFile = bucket.openDownloadStream(ObjectID(id));
  bucketFile.pipe(res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
