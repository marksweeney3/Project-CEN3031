const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Create MySQL Connection Pool
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test DB Connection
db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err);
    } else {
        console.log("Connected to MySQL database!");
    }
});

// API route test
app.get("/", (req, res) => {
    res.send("API is running...");
});

// User registration route
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    // Basic input validation
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to DB
    const sql = "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({ error: "Email already exists." });
            }
            return res.status(500).json({ error: "Database error", details: err });
        }
        res.status(201).json({ message: "User registered!" });
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));