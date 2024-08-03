const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/models.js');
const userController = require('../controller/userController.js');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecretkey';

router.post('/register', async (req, res) => {
    const { username, password, userType } = req.body;
    try {
        const newUser = new User({ username, password, userType });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ _id: user._id, userType: user.userType }, JWT_SECRET, { expiresIn: '1h'});
            res.json({ token });
        } else {
            res.status(400).send('Invalid username or password');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;