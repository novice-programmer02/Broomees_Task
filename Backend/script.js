const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yourpassword",
  database: "yourdatabase",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

// Signup API
app.post("/signup", (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  if (!firstName || !lastName || !email || !username || !password) {
    return res.status(400).send({ message: "All fields are required!" });
  }

  const sql = "INSERT INTO users (firstName, lastName, email, username, password) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [firstName, lastName, email, username, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: "Database error!" });
    }
    res.send({ message: "Signup successful!" });
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
