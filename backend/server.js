const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const db = require("./db"); // Import shared connection

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// API test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Registration route
app.post("/register", async (req, res) => {
    console.log("Received data:", req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

        db.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) {
                console.error("DB Error:", err.code, err.sqlMessage);
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({ error: "Email already exists." });
                }
                return res.status(500).json({ error: "Database error", details: err.sqlMessage });
            }

            res.status(201).json({ message: "User registered!" });
        });

    } catch (err) {
        res.status(500).json({ error: "Error hashing password", details: err });
    }
});

// Login route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "User not found" });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Success
        return res.status(200).json({ success: true, userId: user.id, name: user.name });
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));