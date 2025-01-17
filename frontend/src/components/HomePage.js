import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-pink-700">Welcome to MedTrack!</h1>
      <p className="mt-4 text-lg text-gray-600">
        Keep track of your medications and never miss a dose.
      </p>
      <div className="mt-6 space-x-4">
        <Link
          to="/auth"
          className="bg-pink-500 text-white py-2 px-4 rounded shadow hover:bg-pink-400"
        >
          Get Started
        </Link>
        <Link
          to="/meds"
          className="bg-pink-500 text-white py-2 px-4 rounded shadow hover:bg-pink-400"
        >
          Manage Medications
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

