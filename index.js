const express = require("express");
const process = require("process");
const app = express();
var path = require("path");
var Busboy = require("busboy");

console.log(process.env.DBATLAS_PW);
console.log(process.env.DBATLAS_USER);
// const URI=`mongodb+srv://${process.env.DBATLAS_USER}:${process.env.DBATLAS_PW}@cluster0-duxva.mongodb.net/test?retryWrites=true&w=majority`;
// const URI=`mongodb+srv://admin1:faiz101@cluster0-duxva.mongodb.net/test?retryWrites=true&w=majority`;
const URI = `mongodb+srv://${process.env.DBATLAS_USER}:${process.env.DBATLAS_PW}@cluster0-1znkq.gcp.mongodb.net/test?retryWrites=true`;
// const URI = `mongodb+srv://admin1:faiz101@cluster0-1znkq.gcp.mongodb.net/test?retryWrites=true`;
console.log(URI);
const mongodb = require("mongodb");
const ObjectID = require("mongodb").ObjectID;

const MongoClient = mongodb.MongoClient;

let port = 3001;
const client = new MongoClient(URI, { useNewUrlParser: true });

async function getFileDetails({ id, db }) {
  const bucket = new mongodb.GridFSBucket(db);
  const fileMeta = await bucket.find({ _id: ObjectID(id) }).toArray();
  return fileMeta;
}

let db;
client.connect(err => {
  if (err) {
    console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
  }
  db = client.db("fs-grid");
  console.log(db);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // * => allow all origins
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,OPTIONS,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Auth-Token, Accept"
  );
  next();
});

app.get("/", function(req, res, bucket) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/postFile", (req, res, bucket) => {
  var bucket = new mongodb.GridFSBucket(db);
  const busboy = new Busboy({ headers: req.headers });
  req.pipe(busboy);
  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    const metadata = { mimetype, encoding, fieldname, filename };
    file
      .pipe(
        bucket.openUploadStream(filename, { metadata, contentType: mimetype })
      )
      .on("error", err => {
        console.error("ERROR: ", err);
      })
      .on("finish", payload => {
        console.log("DONE - Finished");
        res.json(payload);
      });
    // 3001 is the port used
  });

  // Listen for event when Busboy is finished parsing the form.
  busboy.on("finish", function() {
    console.log("Finished");
  });
});

app.get("/listFiles", (req, res) => {
  var bucket = new mongodb.GridFSBucket(db);
  bucket
    .find({})
    .toArray()
    .then(data => {
      res.send(JSON.stringify(data));
    });
});

app.get("/getFile", async function(req, res) {
  const { id } = req.query;
  var bucket = new mongodb.GridFSBucket(db);
  const payload = await getFileDetails({ id, db });
  const bucketFile = bucket.openDownloadStream(ObjectID(id));
  res.setHeader("Content-Type", payload[0].contentType);
  bucketFile.pipe(res);
});

app.listen(port === undefined ? (port = 3001) : port, () =>
  console.log(`Example app listening on port ${port}!`)
);
module.exports = { app };
