// MedsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const MedsPage = () => {
  const [meds, setMeds] = useState([]);
  const [medName, setMedName] = useState('');
  const [frequency, setFrequency] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/auth');
    
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (error) {
      console.error('Invalid token:', error);
      navigate('/auth');
    }
  }, [navigate]);

  const fetchMeds = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/v1/meds', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMeds(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch medications:', error);
      alert('Failed to load medications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addMed = async (e) => {
    e.preventDefault();
    if (!medName.trim() || !frequency.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post('/api/v1/meds', 
        { name: medName, frequency },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setMeds(prev => [...prev, data]);
      setMedName('');
      setFrequency('');
    } catch (error) {
      console.error('Failed to add medication:', error);
      alert('Failed to add medication. Please try again.');
    }
  };

  const deleteMed = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/v1/meds/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMeds(prev => prev.filter(med => med.id !== id));
    } catch (error) {
      console.error('Failed to delete medication:', error);
    }
  };

  useEffect(() => { 
    fetchMeds();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-pink-600">MedTrack</Link>
          
          <div className="flex items-center gap-6">
            {user && (
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Welcome, {user.name}</span>
                <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center">
                  {user.name[0]}
                </div>
              </div>
            )}
            <button 
              onClick={handleLogout}
              className="text-gray-600 hover:text-pink-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-pink-600 mb-8">Medication Management</h1>
        
        {/* Add Medication Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={addMed} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={medName}
                onChange={(e) => setMedName(e.target.value)}
                placeholder="Medicine Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
                required
              />
              <input
                type="text"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                placeholder="Frequency (e.g., 8 AM, 2 PM)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition-colors font-semibold"
            >
              Add Medication
            </button>
          </form>
        </div>

        {/* Medication List */}
        {loading ? (
          <div className="text-center p-8 text-gray-500">Loading medications...</div>
        ) : meds.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-xl shadow-lg">
            <p className="text-gray-500">No medications found. Add your first medication above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {meds.map((med) => (
              <div 
                key={med.id}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center hover:shadow-lg transition-shadow"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">{med.name}</h3>
                  <p className="text-gray-600">
                    <span className="font-medium">Schedule:</span> {med.frequency}
                  </p>
                  {med.lastTaken && (
                    <p className="text-sm text-gray-500">
                      Last taken: {new Date(med.lastTaken).toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button 
                    className="text-green-500 hover:text-green-600 p-2 rounded-full hover:bg-green-50"
                    onClick={() => {/* Add mark as taken functionality */}}
                  >
                    ✓
                  </button>
                  <button 
                    className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50"
                    onClick={() => deleteMed(med.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedsPage;
