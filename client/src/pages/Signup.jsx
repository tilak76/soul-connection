import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        gender: '',
        dateOfBirth: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        api.post('/auth/register', formData)
            .then(response => {
                console.log('Signup Success:', response.data);
                navigate('/login');
            })

            .catch(err => {
                console.error('Signup Error:', err);
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                } else if (!err.response) {
                    setError('Unable to connect to server. Please ensure the backend is running.');
                } else {
                    setError('Registration failed. Please try again later.');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-md w-full glass-card p-10 relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Create Account</h2>

                    {error && (
                        <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 pb-1">Full Name</label>
                            <input
                                name="fullName"
                                type="text"
                                required
                                className="input-field"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 pb-1">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="input-field"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 pb-1">Date of Birth</label>
                            <input
                                name="dateOfBirth"
                                type="date"
                                required
                                className="input-field"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 pb-1">Gender</label>
                            <select
                                name="gender"
                                className="input-field"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 pb-1">Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                className="input-field"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="w-full btn-primary flex justify-center py-3">
                            Create Account
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div >
        </div >
    );
};

export default Signup;
