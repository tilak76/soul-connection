import app from './app.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;

// Database connection logic should be here or in app.js
// Since it was missing in the previous view, I will add a basic check or just listen.
// Checking `server/package.json` dependencies... it has `mongoose`.
// It is highly likely the user forgot to include connection logic in `index.js` or I missed it.
// I will assume standard behavior and just listen for now, but adding a note.
// Actually, I'll add the connection logic if I find where it should be.
// For now, just importing app and listening.

// Connect to MongoDB
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
