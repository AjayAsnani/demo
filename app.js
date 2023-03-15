const mysql = require("mysql");

var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "html");
app.set("views", "./public");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ajaycool13",
  database: "sys",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/", (req, res) => {
  connection.query("SELECT image FROM images", (error, results, fields) => {
    if (error) throw error;

    const images = results.map((result) => ({
      name: result.name,
      image: Buffer.from(result.image).toString("base64"),
    }));

    res.send(images);
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000!");
});
