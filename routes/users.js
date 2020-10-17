const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    User.find({ name: req.body.name })
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'User exists'
            });
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                password: req.body.password
            });
            user
            .save()
            .then(result => {
                console.log(result)
                res.status(201).json({
                    message: 'User created'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        }
    })


});


module.exports = router;