const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// API test
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Registration
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

// Login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: "Database error", details: err });
        if (results.length === 0) return res.status(401).json({ error: "User not found" });

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({ error: "Invalid password" });

        return res.status(200).json({
            success: true,
            userId: user.id,
            name: user.name,
        });
    });
});

// Update profile
app.post("/update-profile", (req, res) => {
    const { userId, name, year, preferences, favoriteClass, major } = req.body;
    if (!userId) return res.status(400).json({ error: "User ID is missing" });

    const sql = `
        UPDATE users SET 
        name = ?, 
        year = ?, 
        preferences = ?, 
        favoriteClass = ?, 
        major = ?
        WHERE id = ?`;

    db.query(sql, [name, year, preferences, favoriteClass, major, userId], (err) => {
        if (err) return res.status(500).json({ error: "Database update failed" });
        res.status(200).json({ message: "Profile updated successfully" });
    });
});

// Get profile
app.get("/profile/:userId", (req, res) => {
    const { userId } = req.params;

    const sql = `
        SELECT name, year, preferences, favoriteClass, major, email
        FROM users
        WHERE id = ?`;

    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: "Failed to fetch profile" });
        if (results.length === 0) return res.status(404).json({ error: "User not found" });

        res.status(200).json(results[0]);
    });
});

app.post("/groups/create", (req, res) => {
    const { name, course_code, max_members, preference, creator_id, description } = req.body;

    const sql = `
        INSERT INTO study_groups (name, course_code, max_members, preference, creator_id, description)
        VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [name, course_code, max_members, preference, creator_id, description], (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to create group" });

        const groupId = result.insertId;

        const joinSql = `
            INSERT INTO group_members (group_id, user_id, status)
            VALUES (?, ?, 'accepted')`;

        db.query(joinSql, [groupId, creator_id], (joinErr) => {
            if (joinErr) return res.status(500).json({ error: "Failed to add creator to group" });
            res.status(201).json({ message: "Group created and joined successfully" });
        });
    });
});


app.post("/groups/join", (req, res) => {
    const { group_id, user_id } = req.body;

    const sql = `
        INSERT INTO group_members (group_id, user_id, status)
        VALUES (?, ?, 'accepted')`;  // <-- accepted, not pending

    db.query(sql, [group_id, user_id], (err) => {
        if (err) return res.status(500).json({ error: "Join request failed" });
        res.status(200).json({ message: "Joined group successfully" });
    });
});

app.post("/groups/leave", (req, res) => {
    const { group_id, user_id } = req.body;

    const sql = `
        DELETE FROM group_members
        WHERE group_id = ? AND user_id = ?`;

    db.query(sql, [group_id, user_id], (err) => {
        if (err) return res.status(500).json({ error: "Failed to leave group" });
        res.status(200).json({ message: "Left group successfully" });
    });
});

// My groups
app.get("/groups/my-groups/:userId", (req, res) => {
    const userId = req.params.userId;

    const sql = `
        SELECT sg.id, sg.name, sg.course_code, sg.description, COUNT(gm.id) as member_count
        FROM study_groups sg
        JOIN group_members gm ON gm.group_id = sg.id
        WHERE gm.user_id = ? AND gm.status = 'accepted'
        GROUP BY sg.id`;

    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: "Failed to fetch groups" });
        res.status(200).json(results);
    });
});

app.get("/groups/search", (req, res) => {
    const { userId, query } = req.query;

    const sql = `
        SELECT sg.id, sg.name, sg.course_code, sg.max_members, sg.preference
        FROM study_groups sg
        WHERE (sg.name LIKE ? OR sg.course_code LIKE ?)
          AND sg.id NOT IN (
            SELECT group_id FROM group_members WHERE user_id = ? AND status = 'accepted'
        )
    `;

    const search = `%${query}%`;

    db.query(sql, [search, search, userId], (err, results) => {
        if (err) return res.status(500).json({ error: "Search failed" });
        res.status(200).json(results);
    });
});

// Create study session
app.post("/sessions/create", (req, res) => {
    const { name, location, date_time, description, group_id, creator_id } = req.body;

    const sql = `
    INSERT INTO study_sessions (name, location, date_time, description, group_id, creator_id)
    VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [name, location, date_time, description, group_id, creator_id], (err) => {
        if (err) {
            console.error("Create session error:", err);
            return res.status(500).json({ error: "Failed to create session" });
        }
        res.status(201).json({ message: "Session created!" });
    });
});

// Get user's upcoming sessions
app.get("/sessions/my/:userId", (req, res) => {
    const userId = req.params.userId;

    const sql = `
    SELECT ss.id, ss.name, ss.location, ss.date_time, ss.description,
           sg.name AS group_name, sg.course_code
    FROM study_sessions ss
    JOIN study_groups sg ON ss.group_id = sg.id
    JOIN group_members gm ON gm.group_id = sg.id
    WHERE gm.user_id = ? AND gm.status = 'accepted'
      AND ss.date_time >= NOW()
    ORDER BY ss.date_time ASC`;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Fetch sessions error:", err);
            return res.status(500).json({ error: "Failed to fetch sessions" });
        }
        res.status(200).json(results);
    });
});

app.get("/sessions/user/:userId", (req, res) => {
    const { userId } = req.params;

    const sql = `
        SELECT ss.*, sg.name AS group_name
        FROM study_sessions ss
        JOIN study_groups sg ON ss.group_id = sg.id
        JOIN group_members gm ON gm.group_id = ss.group_id
        WHERE gm.user_id = ? AND gm.status = 'accepted' AND ss.datetime >= NOW()
        ORDER BY ss.datetime`;

    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: "Failed to fetch sessions" });
        res.status(200).json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});