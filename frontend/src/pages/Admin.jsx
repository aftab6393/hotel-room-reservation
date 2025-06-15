import { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    const res = await axios.get('http://localhost:5000/api/rooms', {
      params: { date },
    });
    setRooms(res.data);
  };

  const toggle = async (number) => {
    await axios.post('http://localhost:5000/api/toggle', { date, number });
    fetchRooms();
  };

  const reset = async () => {
    await axios.post('http://localhost:5000/api/reset', { date });
    fetchRooms();
  };

  const randomize = async () => {
    await axios.post('http://localhost:5000/api/random', { date });
    fetchRooms();
  };

  useEffect(() => {
    fetchRooms();
  }, [date]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center text-indigo-600 mb-4">🛠 Admin Dashboard</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button className="bg-red-600 text-white px-4 py-1 rounded" onClick={reset}>Reset All</button>
        <button className="bg-yellow-500 text-white px-4 py-1 rounded" onClick={randomize}>Random Fill</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {rooms.map((room) => (
          <div
            key={room.number}
            className={`p-2 rounded shadow text-center cursor-pointer transition ${
              room.occupied ? 'bg-red-400 text-white' : 'bg-green-400 text-white hover:scale-105'
            }`}
            onClick={() => toggle(room.number)}
          >
            <div className="font-bold">{room.number}</div>
            <div className="text-xs">{room.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
