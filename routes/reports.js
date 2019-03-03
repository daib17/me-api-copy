var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');


/* Route: Get report from database for given title */
router.get('/:title', function (req, res) {
    db.get("SELECT * FROM reports WHERE title = ?",
        req.params.title,
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    source: "/reports",
                    title: "Database error",
                    detail: err.message
                });
            }

            if (rows === undefined) {
                return res.status(401).json({
                    status: 401,
                    source: "/reports",
                    title: "Report not found",
                    detail: "Report with given title not found."
                });
            }

            res.status(200).json({
                status: 200,
                data: rows
            });
        });
});


/* Route: add report to database */
router.post('/',
    (req, res, next) => checkToken(req, res, next),
    (req, res) => addReport(req, res));


/* Check token */
function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function (err) {
        if (err) {
            return res.status(500).json({
                status: 500,
                source: "/reports",
                title: "Error adding report",
                detail: err.message
            });
        }

        // Valid token send on the request
        next();
    });
}


/* Add report */
function addReport(req, res) {
    db.run("INSERT INTO reports (title, content) VALUES (?, ?)",
        req.body.title,
        req.body.content,
        (err) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    source: "/reports",
                    title: "Database error",
                    detail: err.message
                });
            }

            res.status(201).json({
                status: 201,
                message: "Report successfully added."
            });
        });
}


module.exports = router;
