import { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ setBookingResult, fetchRooms, setPreview, selectedDate, setSelectedDate, selectedType, setSelectedType }) => {
  const [count, setCount] = useState(1);

  const previewRooms = async () => {
    const res = await axios.post('http://localhost:5000/api/preview', {
      count,
      date: selectedDate,
      type: selectedType
    });
    setPreview(res.data);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
      <input
        type="date"
        value={selectedDate}
        onChange={e => setSelectedDate(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <select
        value={selectedType}
        onChange={e => setSelectedType(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="AC">AC</option>
        <option value="Non-AC">Non-AC</option>
        <option value="Suite">Suite</option>
      </select>
      <input
        type="number"
        min={1}
        max={5}
        value={count}
        onChange={e => setCount(Number(e.target.value))}
        className="border px-2 py-1 w-20 rounded"
      />
      <button
        onClick={previewRooms}
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
      >
        🔍 Preview Rooms
      </button>
    </div>
  );
};

export default BookingForm;