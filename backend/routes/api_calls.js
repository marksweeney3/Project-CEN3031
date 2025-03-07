const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("API is running...");
});

router.get("/api", (req, res) => {
    res.send("Hello from the API!");
});

router.get("/dbstatus", async (req, res) => {
    const db = require('../utils/db');

    let users = await db.query('SELECT * FROM users');

    let status_message = users == null ? 'disconnected' : 'connected';

    res.send(status_message);
});

router.post("/test_post", (req, res) => {
    let input = req.body.n;
    res.json({ "output": input });
});

router.post("/submit", (req, res) => {
    let input = req.body.n;
    res.json({
        message: req.body.data
    });
});

router.get("/user", (req, res) => {
    res.send("user test request made in test_routes.js");
});

router.get("/db_test", async (req, res) => {
    const db = require('../utils/db');

    const users = await db.query('SELECT * FROM users');

    res.json(users);
});

module.exports = router;


