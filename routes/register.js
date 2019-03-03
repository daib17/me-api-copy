var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');
const bcrypt = require('bcrypt-nodejs');

/* Register user */
router.post('/:email/:password', function (req, res) {
    bcrypt.hash(req.params.password, null, null, function (err, hash) {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/register",
                    title: "bcrypt error",
                    detail: "bcrypt error"
                }
            });
        }

        db.run("INSERT INTO users (email, password) VALUES (?, ?)",
            req.params.email,
            hash, (err) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/register",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                res.status(201).json({
                    data: {
                        message: "User successfully registered."
                    }
                });
            });
    });
});

module.exports = router;
