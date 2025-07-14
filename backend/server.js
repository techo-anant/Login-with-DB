const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); //to access the frontend APIs


const app = express();
const PORT = 5000;

//Middleware
app.use(cors());
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
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err) return res.json("Error");
        if(data.length > 0){
            return res.json("Login Successful")
        } else {
            return res.json("Login Failed")
        }
    })
})

//Routes
app.get('/', (req, res) => {
    res.send('This is the backend.')
})

//Setup server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
