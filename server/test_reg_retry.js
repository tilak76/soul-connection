
const testRegistration = async () => {
    try {
        console.log('Attempting registration...');
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullName: "Retry Test User",
                email: "retry.test" + Date.now() + "@example.com",
                password: "password123",
                gender: "Male",
                dateOfBirth: "1995-05-05"
            })
        });

        const data = await response.json();
        console.log('Status Code:', response.status);
        console.log('Response:', data);

        if (response.ok) {
            console.log("TEST PASSED: Registration successful");
        } else {
            console.log("TEST FAILED: Registration returned error");
        }
    } catch (error) {
        console.error("TEST FAILED: Network error", error);
    }
};

testRegistration();
