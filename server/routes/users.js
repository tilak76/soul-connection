import express from 'express';
// import User from '../models/User.js'; // Removed
import { findUserById, updateUser, readUsers } from '../utils/fileDb.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get Current User Profile
router.get('/profile', verifyToken, async (req, res) => {
    try {
        // const user = await User.findById(req.user.id).select('-password');
        const user = findUserById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove sensitive data before sending
        const { password, ...userWithoutPassword } = user;

        res.json(userWithoutPassword);
    } catch (error) {
        console.error('Fetch Profile Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update Profile
router.put('/profile', verifyToken, async (req, res) => {
    try {
        const updates = req.body;
        // Prevent password update here for security
        delete updates.password;
        delete updates.email; // Prevent email change for now
        delete updates._id; // Prevent ID change

        // const user = await User.findByIdAndUpdate(
        //     req.user.id,
        //     { $set: updates },
        //     { new: true }
        // ).select('-password');

        const updatedUser = updateUser(req.user.id, updates);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { password, ...userWithoutPassword } = updatedUser;

        res.json(userWithoutPassword);
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Matches (Advanced Recommendation Logic)
router.get('/matches', verifyToken, async (req, res) => {
    try {
        const currentUser = findUserById(req.user.id);
        if (!currentUser) return res.status(404).json({ message: 'User not found' });

        // Query Params for Filtering
        const { minAge, maxAge, city, gender } = req.query;

        // Determine default target gender if not specified
        let targetGender = gender;
        if (!targetGender) {
            if (currentUser.gender === 'Male') targetGender = 'Female';
            else if (currentUser.gender === 'Female') targetGender = 'Male';
            // if Other, remain undefined to show all
        }

        const allUsers = readUsers();
        const currentYear = new Date().getFullYear();

        // Filter users
        const matches = allUsers.filter(u => {
            // Exclude self
            if (u._id === currentUser._id) return false;

            // Gender Filter
            if (targetGender && targetGender !== 'All' && u.gender !== targetGender) return false;

            // City Filter (Partial Match)
            if (city && u.city && !u.city.toLowerCase().includes(city.toLowerCase())) return false;

            // Age Filter
            if (u.dateOfBirth) {
                const birthYear = new Date(u.dateOfBirth).getFullYear();
                const age = currentYear - birthYear;
                if (minAge && age < parseInt(minAge)) return false;
                if (maxAge && age > parseInt(maxAge)) return false;
            }

            return true;
        }).slice(0, 50).map(u => {
            const { password, ...safeUser } = u;

            // Calculate Mock Compatibility Score
            // Based on random + simple heuristic (same city = +10%)
            let score = Math.floor(Math.random() * 30) + 60; // Base 60-90%
            if (currentUser.city && u.city && currentUser.city.toLowerCase() === u.city.toLowerCase()) {
                score += 10;
            }
            if (score > 98) score = 98;

            return { ...safeUser, matchPercentage: score };
        });

        res.json(matches);
    } catch (error) {
        console.error('Fetch Matches Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Specific User Profile (Public View)
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const user = findUserById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove sensitive data
        const { password, email, ...userProfile } = user;

        res.json(userProfile);
    } catch (error) {
        console.error('Fetch User Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
