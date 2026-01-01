
const testLogin = async () => {
    try {
        const uniqueId = Date.now();
        const email = `TestCase${uniqueId}@example.com`;
        const lowerEmail = email.toLowerCase();

        // 1. Register with Mixed Case
        console.log(`1. Registering with: ${email}`);
        const regRes = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullName: "Login Test User",
                email: email,
                password: "password123",
                gender: "Male",
                dateOfBirth: "1995-05-05"
            })
        });
        console.log('Registration Status:', regRes.status);

        // 2. Login with Lower Case
        console.log(`2. Logging in with: ${lowerEmail}`);
        const loginRes1 = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: lowerEmail,
                password: "password123"
            })
        });
        const data1 = await loginRes1.json();
        console.log('Login (Lower) Status:', loginRes1.status);

        // 3. Login with Mixed Case
        console.log(`3. Logging in with: ${email}`);
        const loginRes2 = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: "password123"
            })
        });
        const data2 = await loginRes2.json();
        console.log('Login (Mixed) Status:', loginRes2.status);

        if (loginRes1.ok && loginRes2.ok) {
            console.log("TEST PASSED: Case-insensitive login working");
        } else {
            console.log("TEST FAILED: Login failed");
        }

    } catch (error) {
        console.error("TEST FAILED: Network error", error);
    }
};

testLogin();
