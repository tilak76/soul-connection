import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../utils/fileDb.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        let { fullName, email, password, gender, dateOfBirth } = req.body;

        if (!email || !password || !fullName || !gender || !dateOfBirth) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        email = email.toLowerCase(); // Normalize email

        const existingUser = findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = createUser({
            fullName,
            email,
            password: hashedPassword,
            gender,
            dateOfBirth,
            // Add default empty fields to match schema structure
            photos: [],
            bio: "",
            preferences: {}
        });

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;

        email = email.toLowerCase(); // Normalize email

        const user = findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                gender: user.gender
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
