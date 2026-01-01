import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // Auth Fields
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Profile Fields
    fullName: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    dateOfBirth: { type: Date },
    religion: { type: String },
    caste: { type: String },
    city: { type: String },
    profession: { type: String },
    income: { type: String },

    // Additional
    photos: [{ type: String }],
    bio: { type: String },
    preferences: {
        ageRange: { min: Number, max: Number },
        gender: { type: String },
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
