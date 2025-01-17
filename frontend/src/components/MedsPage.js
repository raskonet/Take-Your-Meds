import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedsPage = () => {
  const [meds, setMeds] = useState([]);
  const [medName, setMedName] = useState('');
  const [frequency, setFrequency] = useState('');

  const fetchMeds = async () => {
    try {
      const response = await axios.get('/api/v1/meds');
      setMeds(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addMed = async () => {
    try {
      const response = await axios.post('/api/v1/meds', { name: medName, frequency });
      setMeds([...meds, response.data]);
      setMedName('');
      setFrequency('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMeds();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-pink-700">Your Medications</h1>
      <div className="w-2/3 mt-4">
        {meds.map((med) => (
          <div key={med.id} className="flex justify-between p-2 border-b">
            <span>{med.name}</span>
            <span>{med.frequency}</span>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-4 flex flex-col items-center"
      >
        <input
          type="text"
          placeholder="Medicine Name"
          value={medName}
          onChange={(e) => setMedName(e.target.value)}
          className="border rounded w-64 p-2 mb-4"
        />
        <input
          type="text"
          placeholder="Frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="border rounded w-64 p-2 mb-4"
        />
        <button
          onClick={addMed}
          className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-400"
        >
          Add Medicine
        </button>
      </form>
    </div>
  );
};

export default MedsPage;

