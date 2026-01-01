import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { User, Mail, Calendar, Heart, Camera, Save, MapPin, Briefcase } from 'lucide-react';

const Profile = () => {
    const { user, login } = useAuth(); // Assuming login updates context or we need a way to refresh user
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        bio: '',
        gender: '',
        city: '',
        profession: '',
        photoUrl: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                bio: user.bio || '',
                gender: user.gender || '',
                city: user.city || '',
                profession: user.profession || '',
                photoUrl: user.photos?.[0] || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Update profile
            const updates = {
                ...formData,
                photos: formData.photoUrl ? [formData.photoUrl] : []
            };

            // Remove photoUrl from updates to send clean object if needed, 
            // but our backend takes flexible updates currently logic-wise
            // except specific fields.
            // Let's refine payload:
            const payload = {
                fullName: updates.fullName,
                bio: updates.bio,
                gender: updates.gender,
                city: updates.city,
                profession: updates.profession,
                photos: updates.photos
            };

            const response = await api.put('/users/profile', payload);
            console.log("Profile updated:", response.data);

            // We might need to update the local user context here. 
            // If useAuth exposes a method to update user, use it.
            // For now, assume page reload or re-login is needed 
            // OR simple optimistic UI for now.
            setMessage('Profile updated successfully!');
        } catch (error) {
            console.error('Update Error:', error);
            setMessage('Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="text-center p-10">Please login to view profile.</div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="glass-card overflow-hidden">
                    <div className="relative h-48 bg-gradient-to-r from-primary-500 to-secondary-500">
                        <div className="absolute -bottom-16 left-8">
                            <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
                                <img
                                    src={formData.photoUrl || `https://ui-avatars.com/api/?name=${user.fullName}&background=random&size=128`}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 px-8 pb-8">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{user.fullName}</h1>
                                <p className="text-gray-500 flex items-center mt-1">
                                    <Mail size={16} className="mr-2" />
                                    {user.email}
                                </p>
                            </div>
                            <span className="px-4 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-medium">
                                Free Member
                            </span>
                        </div>

                        {message && (
                            <div className={`p-4 rounded-lg mb-6 text-center ${message.includes('Success') ? 'bg-green-50 text-green-600' : 'bg-green-50 text-green-600'}`}>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="input-field pl-10"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="input-field"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="e.g. Mumbai"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="input-field pl-10"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            name="profession"
                                            placeholder="e.g. Software Engineer"
                                            value={formData.profession}
                                            onChange={handleChange}
                                            className="input-field pl-10"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo URL</label>
                                    <div className="relative">
                                        <Camera className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            name="photoUrl"
                                            placeholder="https://example.com/my-photo.jpg"
                                            value={formData.photoUrl}
                                            onChange={handleChange}
                                            className="input-field pl-10"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Paste a direct link to an image.</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea
                                    name="bio"
                                    rows="4"
                                    className="input-field resize-none"
                                    placeholder="Tell us about yourself..."
                                    value={formData.bio}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex justify-end pt-4 border-t border-gray-100">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary flex items-center px-8"
                                >
                                    <Save size={18} className="mr-2" />
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
