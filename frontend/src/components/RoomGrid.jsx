import Room from './Room';
const RoomGrid = ({ rooms }) => {
  const grouped = [...Array(10)].map((_, i) =>
    rooms.filter(r => r.floor === i + 1)
  );
  return (
    <div className="space-y-4 mt-6">
      {grouped.map((floorRooms, i) => (
        <div key={i}>
          <h2 className="text-lg font-semibold text-gray-700 mb-1">Floor {i + 1}</h2>
          <div className="flex flex-wrap gap-2">
            {floorRooms.map(room => (
              <Room key={room.number} room={room} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default RoomGrid;