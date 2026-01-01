import serverless from 'serverless-http';
import app from '../../server/app.js';
import mongoose from 'mongoose';

// Connect to Database (Essential for serverless)
// Note: We need to ensure the connection is reused.
let conn = null;

const connectDB = async () => {
    if (conn == null) {
        conn = mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });
        await conn;
    }
    return conn;
};

// Middleware to ensure DB is connected before handling request
const handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await connectDB();
    const serverlessHandler = serverless(app);
    return serverlessHandler(event, context);
};

export { handler };
// Actually, `serverless-http` can handle the async setup if we wrap it correctly.
// But exporting `handler` like above is safer for explicit DB connection control.
// Wait, `export const handler` is the named export Netlify expects?
// No, standard `export const handler` or `export default` depending on configuration.
// By default, Netlify Functions (JS) look for named `handler` export.
