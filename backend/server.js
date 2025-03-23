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
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

        db.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) {
                console.error("DB Error:", err); // ← Add this
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({ error: "Email already exists." });
                }
                return res.status(500).json({ error: "Database error", details: err });
            }

            res.status(201).json({ message: "User registered!" });
        });
    } catch (err) {
        res.status(500).json({ error: "Error hashing password", details: err });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));