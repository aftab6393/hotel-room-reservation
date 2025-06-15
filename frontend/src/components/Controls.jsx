import axios from 'axios';

const Controls = ({ fetchRooms }) => {
  const handleRandom = async () => {
    await axios.post('http://localhost:5000/api/random');
    fetchRooms();
  };

  const handleReset = async () => {
    await axios.post('http://localhost:5000/api/reset');
    fetchRooms();
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6">
      <button onClick={handleRandom} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded shadow-md transition">
        🎲 Random Occupancy
      </button>
      <button onClick={handleReset} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md transition">
        🔁 Reset Booking
      </button>
    </div>
  );
};

export default Controls;
