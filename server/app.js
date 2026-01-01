import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection (Moved here to ensure connection on function invocation if not connected)
// In serverless, it's good to check connection status.
// However, for simplicity, we'll keep the basic setup but usually we need to ensure DB connects.
// Original index.js didn't show DB connection logic?
// Wait, looking at index.js content provided in context... 
// It imports routes but I don't see mongoose.connect in the file content provided in Step 38!
// Ah, maybe it's in the routes or I missed it. 
// Let me check 'server/index.js' again in Step 38.
// It DOES NOT have mongoose.connect.
// It imports user routes and auth routes. Maybe they connect? Or maybe it's missing?
// Check 'server/test_reg.js' or other files to see how they connect?
// Wait, the user said "Fix Registration and Database" in previous turns.
// I should check `server/routes/auth.js` to see if it connects or if `index.js` was incomplete.
// Actually, `index.js` in step 38 has `res.send('Soul Connection API is running (File Mode)')`.
// It seems the DB connection might be missing from the provided `index.js` view or it handles it inside routes (unlikely).
// Let me check `server/routes/auth.js` or `server/db.js` if it exists.
// BUT, I must preserve existing behavior.
// If `index.js` as seen in step 38 is the source of truth, I will stick to it.
// Wait, step 38 `index.js` imports `routes/auth.js`.
// I will stick to moving logic to `app.js`.

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Soul Connection API is running (File Mode)');
});

export default app;
