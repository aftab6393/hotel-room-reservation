const PreviewResult = ({ preview, onConfirm }) => {
  if (!preview) return null;
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded mb-4">
      <p className="font-medium">Best Room Suggestion:</p>
      <p>Rooms: {preview.rooms.map(r => r.number).join(', ')}</p>
      <p>Estimated Travel Time: {preview.time} min</p>
      <button
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded shadow"
        onClick={onConfirm}
      >
        ✅ Confirm This Booking
      </button>
    </div>
  );
};

export default PreviewResult;