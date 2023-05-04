const mysql = require("mysql");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());

app.get("/venues", (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Development16",
    database: "seniorProjects",
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });

  connection.query("SELECT * FROM venues", (err, results, fields) => {
    res.send(results);
    console.log("results sent");
  });
  connection.end();
});

app.get("/cart", (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Development16",
    database: "seniorProjects",
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });

  connection.query(
    "SELECT * FROM venues WHERE incart=1 ",
    (err, results, fields) => {
      res.send(results);
      console.log("results sent");
    }
  );
  connection.end();
});

app.get("/postcart", (req, res) => {
  const query = req.query.id;
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Development16",
    database: "seniorProjects",
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });

  connection.query(
    `UPDATE venues SET incart = 1 where id=${query} `,
    (err, results, fields) => {
      res.send(results);
      console.log("results sent");
    }
  );
  connection.end();
});

app.get("/addproduct", (req, res) => {
  const id = req.query.id;
  const name = req.query.name;
  const image = req.query.image;
  const price = req.query.price;
  const location = "Bangalore";

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Development16",
    database: "seniorProjects",
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });

  connection.query(
    `INSERT INTO venues(id,price, image, name, location, incart) VALUES(${id},${price}, "${image}", "${name}","${location}",0)`,
    (err, results, fields) => {
      res.send(results);
      console.log("results sent");
    }
  );
  connection.end();
});


app.get("/deleteproduct", (req, res) => {
  const id = req.query.id;
  console.log("deleting product"+id);
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Development16",
    database: "seniorProjects",
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });

  connection.query(
    `DELETE FROM venues WHERE id= ${id}`,
    (err, results, fields) => {
      res.send(results);
      console.log("deleted product");
      console.log(err)
    }
  );
  connection.end();
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
