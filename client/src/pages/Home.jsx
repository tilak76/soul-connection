import React from 'react';
import { Search, Users, Shield, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-100 z-0"></div>
                <div className="absolute top-20 left-20 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight"
                    >
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Soulmate</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
                    >
                        Join millions of happy couples who found their perfect match.
                        Safe, secure, and designed for meaningful connections.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col md:flex-row justify-center items-center gap-4"
                    >
                        <div className="glass-card p-2 flex items-center w-full max-w-md">
                            <Search className="w-5 h-5 text-gray-400 ml-3" />
                            <input
                                type="text"
                                placeholder="Search by city, caste, or profession..."
                                className="w-full px-4 py-2 bg-transparent outline-none text-gray-700"
                            />
                            <button className="btn-primary py-2 px-6 rounded-xl">Search</button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">100% Verified Profiles</h3>
                            <p className="text-gray-500">Every profile is manually screened by our team to ensure safety and authenticity.</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                            <div className="w-16 h-16 bg-secondary-100 text-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Safe & Secure</h3>
                            <p className="text-gray-500">Your privacy is our priority. Control who sees your number and photos.</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                            <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Intelligent Matching</h3>
                            <p className="text-gray-500">Our AI algorithm suggests compatible matches based on your preferences.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
