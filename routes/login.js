var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');


/* Login */
router.post('/:email/:password', function (req, res) {
    // Get user from db
    db.get("SELECT * FROM users WHERE email = ?",
        req.params.email,
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    data: {
                        status: 500,
                        source: "/login",
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            if (rows === undefined) {
                return res.status(401).json({
                    data: {
                        status: 401,
                        source: "/login",
                        title: "User not found",
                        detail: "User with provided email not found."
                    }
                });
            }

            const user = rows;

            // Compare password
            bcrypt.compare(req.params.password, user.password,
                (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            data: {
                                status: 500,
                                source: "/login",
                                title: "bcrypt error",
                                detail: "bcrypt error"
                            }
                        });
                    }

                    if (result) {
                        const payload = { email: user.email };
                        const secret = process.env.JWT_SECRET;
                        const jwtToken = jwt.sign(payload, secret, { expiresIn: '12h' });

                        return res.json({
                            data: {
                                status: 201,
                                type: "success",
                                message: "User logged in",
                                user: payload,
                                token: jwtToken
                            }
                        });
                    } else {
                        return res.status(401).json({
                            data: {
                                status: 401,
                                source: "/login",
                                title: "Wrong password",
                                detail: "Password is incorrect."
                            }
                        });
                    }
                });
        });
});


module.exports = router;
