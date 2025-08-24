const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors'); //to access the frontend APIs
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

//Middleware
// app.use(cors());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',  // or wherever your frontend runs
  credentials: true
}));
app.use(express.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "login_db",
  password: "Anant@123",
  database: "Login"
})

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL database!');
});

app.post('/login', async (req, res) => {
  try {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [data] = await db.promise().query(sql, [req.body.email]);

    if (data.length === 0) {
      return res.status(401).json({ message: "Login Failed: User not found" });
    }

    // Compare entered password with hashed password in DB

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(req.body.password, data[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: "Login Failed: Incorrect password" });
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      { id: data[0].id, email: data[0].email },
      "superSecretKey", // use env var in production
      { expiresIn: "1d" }
    );

    // Set cookie
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000
    });
    return res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    console.log("Login erroe:", error);
    return res.status(401).json({ message: "Login Failed: Incorrect password" });
  };
});

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  // 1. Hash password
  const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

  try {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: "Email already exists" });
        }
        return res.status(500).json({ message: "Database error", errro: err });
      }
      return res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});


app.post('/success', (req, res) => {
  res.clearCookie("token");   // deletes the cookie
  return res.status(200).json({ message: "Logged out successfully" });
});

app.post("/signout", async (req, res) => {
  try {
    // decode cookie if needed
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, "superSecretKey");

    db.query("DELETE FROM users WHERE email = ?", [decoded.email], (err, result) => {
      if (err) throw err;
      res.clearCookie("token");
      res.json({ message: "Signed out and user deleted successfully" });
    });
  } catch (error) {
    console.error("Signout error:", error);
    return res.sendStatus(500);
  }
});

//Routes
app.get('/', (req, res) => {
  res.send('This is the backend.')
})

//Setup server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})
