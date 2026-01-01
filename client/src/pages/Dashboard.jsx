import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Heart, X, MessageCircle, MapPin, Briefcase, Sliders, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    // Filter State
    const [filters, setFilters] = useState({
        minAge: 18,
        maxAge: 50,
        city: '',
        gender: ''
    });

    const fetchMatches = async (appliedFilters = {}) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (appliedFilters.minAge) params.append('minAge', appliedFilters.minAge);
            if (appliedFilters.maxAge) params.append('maxAge', appliedFilters.maxAge);
            if (appliedFilters.city) params.append('city', appliedFilters.city);
            if (appliedFilters.gender) params.append('gender', appliedFilters.gender);

            const response = await api.get(`/users/matches?${params.toString()}`);
            setMatches(response.data);
        } catch (error) {
            console.error("Error fetching matches:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchMatches();
        }
    }, [user]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const applyFilters = () => {
        fetchMatches(filters);
        setShowFilters(false);
    };

    const handleConnect = (matchId) => {
        console.log("Connecting with", matchId);
        removeMatch(matchId);
    };

    const handleSkip = (matchId) => {
        removeMatch(matchId);
    };

    const removeMatch = (id) => {
        setMatches(prev => prev.filter(m => m._id !== id));
    };

    const handleViewProfile = (userId) => {
        navigate(`/user/${userId}`);
    };

    if (loading && !matches.length && !showFilters) return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="animate-pulse flex flex-col items-center">
                <Heart className="w-12 h-12 text-primary-300 mb-4" />
                <p className="text-gray-500 font-medium">Finding your perfect match...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-10 px-4">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Hello, {user?.fullName?.split(' ')[0]}! 👋
                        </h1>
                        <p className="text-gray-600 mt-2">Here are your daily recommendations.</p>
                    </div>
                    <button
                        onClick={() => setShowFilters(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                    >
                        <Sliders size={18} />
                        Match Maker
                    </button>
                </header>

                {/* Filter Modal */}
                <AnimatePresence>
                    {showFilters && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowFilters(false)}
                                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl p-8 z-50 w-full max-w-md"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Filter Matches</h2>
                                    <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Min Age</label>
                                            <input
                                                type="number"
                                                name="minAge"
                                                value={filters.minAge}
                                                onChange={handleFilterChange}
                                                className="input-field"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Max Age</label>
                                            <input
                                                type="number"
                                                name="maxAge"
                                                value={filters.maxAge}
                                                onChange={handleFilterChange}
                                                className="input-field"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                name="city"
                                                value={filters.city}
                                                onChange={handleFilterChange}
                                                placeholder="Any City"
                                                className="input-field pl-10"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                        <select
                                            name="gender"
                                            value={filters.gender}
                                            onChange={handleFilterChange}
                                            className="input-field"
                                        >
                                            <option value="">Any Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <button
                                        onClick={applyFilters}
                                        className="w-full btn-primary py-3 rounded-xl flex justify-center items-center gap-2"
                                    >
                                        <Heart size={20} fill="currentColor" />
                                        Find Matches
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {matches.length === 0 && !loading ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No matches found</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mb-8">
                            We couldn't find anyone matching your current filters. Try adjusting your preferences to see more people.
                        </p>
                        <button
                            onClick={() => setShowFilters(true)}
                            className="btn-primary"
                        >
                            Adjust Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {matches.map((match) => (
                                <motion.div
                                    key={match._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group ring-1 ring-gray-100"
                                >
                                    <div className="relative h-96 overflow-hidden">
                                        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                                        <img
                                            src={match.photos?.[0] || `https://ui-avatars.com/api/?name=${match.fullName}&background=random&size=400`}
                                            alt={match.fullName}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 flex items-end p-6">
                                            <div className="text-white w-full">
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <h3 className="text-2xl font-bold truncate tracking-tight">{match.fullName.split(' ')[0]}, {match.dateOfBirth ? new Date().getFullYear() - new Date(match.dateOfBirth).getFullYear() : 'N/A'}</h3>
                                                        <div className="flex items-center text-sm mt-2 opacity-90 font-medium">
                                                            <MapPin size={16} className="mr-1 text-primary-400" />
                                                            {match.city || 'Location N/A'}
                                                        </div>
                                                    </div>
                                                    {match.matchPercentage && (
                                                        <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold border border-white/30">
                                                            {match.matchPercentage}% Match
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center text-gray-600 mb-6 text-sm font-medium bg-gray-50 p-3 rounded-xl">
                                            <Briefcase size={18} className="mr-3 text-primary-500" />
                                            {match.profession || 'Profession N/A'}
                                        </div>

                                        <div className="grid grid-cols-3 gap-3">
                                            <button
                                                onClick={() => handleSkip(match._id)}
                                                className="col-span-1 py-3 rounded-xl border-2 border-gray-100 text-gray-500 hover:border-gray-300 hover:bg-gray-50 font-bold transition-all flex justify-center items-center"
                                                title="Skip"
                                            >
                                                <X size={24} />
                                            </button>
                                            <button
                                                onClick={() => handleViewProfile(match._id)}
                                                className="col-span-1 py-3 rounded-xl border-2 border-primary-100 text-primary-600 hover:bg-primary-50 font-bold transition-all flex justify-center items-center"
                                                title="View Profile"
                                            >
                                                <UserIcon size={24} />
                                            </button>
                                            <button
                                                onClick={() => handleConnect(match._id)}
                                                className="col-span-1 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:shadow-lg hover:shadow-primary-200 font-bold transition-all flex justify-center items-center transform active:scale-95"
                                                title="Connect"
                                            >
                                                <Heart size={24} fill="currentColor" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
