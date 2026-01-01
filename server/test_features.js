// using global fetch


const BASE_URL = 'http://localhost:5000/api';
let authToken = '';
let targetUserId = '1766933116629'; // ID of "Test User" from users.json

const runTests = async () => {
    console.log("=== Starting Feature Verification Tests ===");

    // 1. Register a Female User
    console.log("\n1. Registering new Female User...");
    const email = `test.female.${Date.now()}@example.com`;
    const regRes = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            fullName: "Test Female",
            email: email,
            password: "password123",
            gender: "Female",
            dateOfBirth: "2000-01-01"
        })
    });
    console.log(`   Register Status: ${regRes.status}`);

    // 2. Login
    console.log("\n2. Logging in...");
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: "password123"
        })
    });
    const loginData = await loginRes.json();
    authToken = loginData.token;
    console.log(`   Login Status: ${loginRes.status}`);
    if (!authToken) {
        console.error("   ABORT: No token received.");
        return;
    }

    // 3. Get Matches (Default - Should find Males)
    console.log("\n3. Testing GET /users/matches (Default)...");
    const matchRes = await fetch(`${BASE_URL}/users/matches`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const matchData = await matchRes.json();
    console.log(`   Status: ${matchRes.status}`);
    console.log(`   Matches Found: ${matchData.length}`);
    if (matchData.length > 0) {
        console.log(`   First Match Name: ${matchData[0].fullName}`);
        targetUserId = matchData[0]._id; // Update target to a real match found
    } else {
        console.warn("   WARNING: No matches found (expected Males).");
    }

    // 4. Get Matches with Filter (Explicitly ask for Male)
    console.log("\n4. Testing GET /users/matches?gender=Male...");
    const filterRes = await fetch(`${BASE_URL}/users/matches?gender=Male`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const filterData = await filterRes.json();
    console.log(`   Status: ${filterRes.status}`);
    console.log(`   Filtered Matches Found: ${filterData.length}`);

    // 5. Get Specific User Profile (View Profile Feature)
    console.log(`\n5. Testing GET /users/${targetUserId} (View Profile)...`);
    const profileRes = await fetch(`${BASE_URL}/users/${targetUserId}`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const profileData = await profileRes.json();
    console.log(`   Status: ${profileRes.status}`);
    if (profileRes.ok) {
        console.log(`   Profile Full Name: ${profileData.fullName}`);
        console.log("   TEST PASSED: Profile fetched successfully.");
    } else {
        console.error("   TEST FAILED: Could not fetch profile.");
        console.log("   Response:", profileData);
    }
};

runTests();
