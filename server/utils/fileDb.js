import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../data/users.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Initialize DB file if not exists
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

export const readUsers = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users DB:', error);
        return [];
    }
};

export const writeUsers = (users) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing users DB:', error);
        return false;
    }
};

export const findUserByEmail = (email) => {
    const users = readUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const findUserById = (id) => {
    const users = readUsers();
    return users.find(u => u._id === id);
};

export const createUser = (userData) => {
    const users = readUsers();
    const newUser = {
        _id: Date.now().toString(), // Simple ID generation
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...userData
    };
    users.push(newUser);
    writeUsers(users);
    return newUser;
};

export const updateUser = (id, updates) => {
    const users = readUsers();
    const index = users.findIndex(u => u._id === id);
    if (index === -1) return null;

    users[index] = { ...users[index], ...updates, updatedAt: new Date().toISOString() };
    writeUsers(users);
    return users[index];
};
