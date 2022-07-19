const express = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Env = require('../config');
const { JWT_KEY } = require('../config');
const authMiddleWare = require('../middleware/auth');
const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User with email already exists!' });
        }

        const hashedPassword = await bcryptjs.hash(password, Env.SALT);

        let user = new User({
            name,
            email,
            password: hashedPassword,
        });  
        user = await user.save();
        res.json(user);
    }
    catch(e) {
        res.status(500).send({ err: e.message });
    }
});


authRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist!' });
        }

        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ msg: 'Incorrect password!' });
        }
        
        const token = jwt.sign({ id: user._id }, JWT_KEY);
        res.json({ token, ...user._doc });
    } catch(e) {
        res.status(500).json({ err: e.message });
    }
});


authRouter.post('/tokenIsValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.json(false);
        }
        const verified = jwt.verify(token, JWT_KEY);
        if (!verified) {
            return res.json(false);
        }
        const user = await User.findById(verified.id);
        if (!user) {
            return res.json(false);
        }

        res.json(true);
    } catch(e) {
        res.status(500).json({ err: e.message });
    }
});


authRouter.get('/', authMiddleWare, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({ ...user._doc, token: req.token });
});

module.exports = authRouter;