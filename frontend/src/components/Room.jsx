const Room = ({ room }) => {
  return (
    <div
      className={`w-14 h-14 flex items-center justify-center rounded-lg text-sm font-semibold shadow-md transition-all duration-300 ${
        room.occupied
          ? 'bg-red-500 text-white'
          : 'bg-green-400 text-white hover:scale-105 hover:shadow-xl cursor-pointer'
      }`}
      title={`Room ${room.number}`}
    >
      {room.number}
    </div>
  );
};

export default Room;
