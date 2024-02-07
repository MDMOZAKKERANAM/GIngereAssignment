const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// for login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM login WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        console.error("Error logging in:", err);
        res.status(500).send("Error logging in");
      } else {
        if (results.length > 0) {
          console.log("User logged in successfully");
          res.status(200).send("User logged in successfully");
          res.redirect("/profile");
        } else {
          console.log("Invalid email or password");
          res.status(401).send("Invalid email or password");
        }
      }
    }
  );
});

//Insert user data into the database
app.post("/signup", (req, res) => {
  const { email, password, name, clgname, branch, age, dob, contact } =
    req.body;

  db.query(
    "INSERT INTO login (email, password, name, clgname, branch, age, dob, contact) VALUES (?, ?, ?,?, ?, ?, ?, ?)",
    [email, password, name, clgname, branch, age, dob, contact],
    (err, result) => {
      if (err) {
        console.error("Error signing up:", err);
        res.status(500).send("Error signing up");
      } else {
        console.log("User signed up successfully");
        res.status(200).send("User signed up successfully");
      }
    }
  );
});

app.get("/user", (req, res) => {
  const email = req.query.email;

  db.query("SELECT * FROM login WHERE email = ?", email, (error, results) => {
    if (error) {
      console.error("Error fetching user details:", error.message);
      res.status(500).send("Error fetching user details");
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).send("User not found");
      }
    }
  });
});

app.put("/user/:id", (req, res) => {
  // Extract user ID from the request URL
  const userId = req.params.id;
  const updatedDetails = req.body;

  // Update user details by the use of id
  db.query(
    "UPDATE login SET ? WHERE id = ?",
    [updatedDetails, userId],
    (err, result) => {
      if (err) {
        console.error("Error updating user details:", err);
        res.status(500).send("Error updating user details");
      } else {
        console.log("User details updated successfully");
        res.status(200).send("User details updated successfully");
      }
    }
  );
});

app.get("/profile", (req, res) => {
  res.send("Welcome to the home page!");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
