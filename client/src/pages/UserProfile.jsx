import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { User, MapPin, Briefcase, Calendar, Heart, ArrowLeft, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/users/${id}`);
                setUser(response.data);
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("User not found or you don't have permission to view this profile.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id]);

    const handleConnect = () => {
        // Implement connect logic
        alert("Connection request sent! (Mock)");
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="animate-pulse flex flex-col items-center">
                <User className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">Loading profile...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-3xl shadow-sm text-center max-w-md w-full">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
                <p className="text-gray-500 mb-6">{error}</p>
                <button onClick={() => navigate(-1)} className="btn-primary w-full">Go Back</button>
            </div>
        </div>
    );

    if (!user) return null;

    const age = user.dateOfBirth ? new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear() : 'N/A';

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Matches
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-sm overflow-hidden"
                >
                    <div className="h-64 sm:h-80 relative bg-gray-200">
                        <img
                            src={user.photos?.[0] || `https://ui-avatars.com/api/?name=${user.fullName}&background=random&size=800`}
                            alt={user.fullName}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            <h1 className="text-4xl sm:text-5xl font-bold mb-2">{user.fullName.split(' ')[0]}, {age}</h1>
                            <div className="flex items-center text-white/90 text-lg">
                                <MapPin size={20} className="mr-2" />
                                {user.city || 'Location N/A'}
                            </div>
                        </div>
                    </div>

                    <div className="p-8 sm:p-10">
                        <div className="flex flex-col md:flex-row gap-10">
                            {/* Main Info */}
                            <div className="flex-1 space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">About Me</h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {user.bio || "This user hasn't written a bio yet."}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex items-center p-4 bg-gray-50 rounded-2xl">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary-500 shadow-sm mr-4">
                                            <Briefcase size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Profession</p>
                                            <p className="text-gray-900 font-bold">{user.profession || 'Not Specified'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-4 bg-gray-50 rounded-2xl">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary-500 shadow-sm mr-4">
                                            <Calendar size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Age</p>
                                            <p className="text-gray-900 font-bold">{age} years old</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar / Actions */}
                            <div className="w-full md:w-80 space-y-4">
                                <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                                        Interested in {user.fullName.split(' ')[0]}?
                                    </h3>
                                    <div className="space-y-3">
                                        <button
                                            onClick={handleConnect}
                                            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold text-lg hover:shadow-xl hover:shadow-primary-200 transition-all transform active:scale-95 flex justify-center items-center gap-2"
                                        >
                                            <Heart fill="currentColor" size={24} />
                                            Connect Now
                                        </button>
                                        <button className="w-full py-4 rounded-xl border-2 border-primary-100 text-primary-600 font-bold text-lg hover:bg-primary-50 transition-colors flex justify-center items-center gap-2">
                                            <MessageCircle size={24} />
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default UserProfile;
