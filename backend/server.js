const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); //to access the frontend APIs
const bcrypt = require('bcrypt');// to secure the password
const { hasSubscribers } = require('diagnostics_channel');


const app = express();
const PORT = 5000;

//Middleware
// app.use(cors());
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
    console.error('❌ MySQL connection failed:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL database!');
});

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.status(500).json({message: "Database error!"});

    if (data.length === 0) {
      return res.status(401).json({message: "Login Failed: User not found"});
    }

    // Compare entered password with hashed password in DB
    if (req.body.password === data[0].password) {
        return res.status(200).json({message: "Login Successful"});
      } else {
        return res.status(401).json({message: "Login Failed: Incorrect password"});
    };
  });
});

app.post('/signup', async (req, res) => {
    const {name, email, password} = req.body;
    console.log(req.body);

    try {
        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

        db.query(sql, [name, email, password], (err, result) => {
            if(err){
                if(err.code === 'ER_DUP_ENTRY'){
                    return res.status(400).json({message: "Email already exists"});
                }
                return res.status(500).json({message: "Database error", errro: err});
            }
            return res.status(201).json({ message: "User registered successfully" });
        });
    } catch (error){
        return res.status(500).json({ message: "Server error", error });
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
