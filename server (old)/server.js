const express = require("express");
const cors = require("cors");
const mysql = require("mysql2"); 
require("dotenv").config();      

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",           
    password: "root",           
    database: "softeng_sports_equip_rental", 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// LOGIN ROUTE
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users_tbl WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, result) => {
        if (err) return res.status(500).json({ message: "Server Error" });

        if (result.length > 0) {
            const user = result[0];

            res.json({
                success: true,
                user: {
                    id: user.userID,
                    fullname: user.fullname,
                    role: user.role 
                }
            });
        } else {
            res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
    });
});

// REGISTER ROUTE
app.post("/api/register", (req, res) => {
    const { fullname, email, password, role } = req.body;
    
    // Force lowercase to ensure it matches ENUM('student', 'staff')
    const sanitizedRole = role.toLowerCase(); 

    const sql = "INSERT INTO users_tbl (fullname, email, role, password, status) VALUES (?, ?, ?, ?, 'active')";
    
    db.query(sql, [fullname, email, sanitizedRole, password], (err, result) => {
        if (err) {
            console.error("MySQL Error:", err.sqlMessage); 
            return res.status(500).json({ success: false, message: "Registration failed." });
        }
        res.json({ success: true, message: "Registration successful!" });
    });
});


const port = 1337;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});