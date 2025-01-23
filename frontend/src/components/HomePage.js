// HomePage.js (updated)
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Navigation Bar (same as in MedsPage) */}
      
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-5xl font-bold text-pink-600 mb-6 mt-12">
          Smart Medication Management
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Never miss a dose with intelligent reminders, medication tracking, 
          and personalized health insights.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">For Patients</h3>
            <p className="text-gray-600 mb-4">
              Track medications, set reminders, and monitor your health progress.
            </p>
            <Link
              to="/auth"
              className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
            >
              Patient Login
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">For Caregivers</h3>
            <p className="text-gray-600 mb-4">
              Manage multiple patients and receive medication adherence reports.
            </p>
            <Link
              to="/auth"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Caregiver Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
