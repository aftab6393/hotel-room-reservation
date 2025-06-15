import Header from './components/Header';
import Footer from './components/Footer';
import RoomGrid from './components/RoomGrid';
import BookingForm from './components/BookingForm';
import Controls from './components/Controls';
import PreviewResult from './components/PreviewResult';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBed } from 'react-icons/fa';

function App() {
  const [rooms, setRooms] = useState([]);
  const [bookingResult, setBookingResult] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedType, setSelectedType] = useState('AC');

  const fetchRooms = async () => {
    const res = await axios.get('http://localhost:5000/api/rooms', {
      params: { date: selectedDate }
    });
    setRooms(res.data);
  };

  useEffect(() => {
    fetchRooms();
  }, [selectedDate]);

  const confirmBooking = async () => {
    const res = await axios.post('http://localhost:5000/api/book', {
      count: preview.rooms.length,
      date: selectedDate,
      type: selectedType
    });
    setBookingResult(res.data);
    setPreview(null);
    fetchRooms();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-purple-200 text-gray-800 font-sans">
      <Header />
      <main className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-2xl mt-6 mb-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-indigo-700 mb-2 drop-shadow-sm flex justify-center items-center gap-2">
            <FaBed className="text-indigo-500" /> Hotel Room Reservation System
          </h2>
          <p className="text-gray-600 text-md md:text-lg">
            Plan your stay! Choose a date and book your ideal set of rooms smartly based on travel time.
          </p>
        </div>

        <div className="mb-6">
          <BookingForm
            setBookingResult={setBookingResult}
            fetchRooms={fetchRooms}
            setPreview={setPreview}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </div>

        {preview && (
          <div className="mb-6">
            <PreviewResult preview={preview} onConfirm={confirmBooking} />
          </div>
        )}

        {bookingResult && (
          <div
            className={`mb-6 p-4 rounded-xl text-center font-medium text-lg transition duration-300 ease-in-out shadow-md ${
              bookingResult.success
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {bookingResult.success
              ? `✅ Booked Rooms: ${bookingResult.rooms.map(r => r.number).join(', ')} | Travel Time: ${bookingResult.time} min`
              : `❌ ${bookingResult.message}`}
          </div>
        )}

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
          <RoomGrid rooms={rooms.filter(r => r.type === selectedType)} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
