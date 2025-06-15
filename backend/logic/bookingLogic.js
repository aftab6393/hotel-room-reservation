const roomMap = new Map(); // Key: date (YYYY-MM-DD), Value: room array

function generateRooms() {
  const newRooms = [];
  for (let floor = 1; floor <= 9; floor++) {
    for (let r = 1; r <= 10; r++) {
      const type = floor <= 3 ? 'Non-AC' : floor <= 7 ? 'AC' : 'Suite';
      newRooms.push({
        number: `${floor}${r.toString().padStart(2, '0')}`,
        floor,
        occupied: false,
        type,
      });
    }
  }
  for (let r = 1; r <= 7; r++) {
    newRooms.push({
      number: `100${r}`,
      floor: 10,
      occupied: false,
      type: 'Suite',
    });
  }
  return newRooms;
}

function initializeDate(date) {
  if (!roomMap.has(date)) {
    roomMap.set(date, generateRooms());
  }
}

function getRooms(date) {
  initializeDate(date);
  return roomMap.get(date);
}

function resetRooms(date) {
  roomMap.set(date, generateRooms());
}

function randomOccupy(date) {
  initializeDate(date);
  const rooms = roomMap.get(date);
  rooms.forEach((room) => {
    room.occupied = Math.random() < 0.3;
  });
}

function toggleRoom(date, number) {
  initializeDate(date);
  const rooms = roomMap.get(date);
  const index = rooms.findIndex(r => r.number === number);
  if (index !== -1) rooms[index].occupied = !rooms[index].occupied;
  return rooms[index];
}

function calculateTravelTime(selected) {
  if (selected.length === 0) return Infinity;
  const floors = selected.map(r => r.floor);
  const vertical = (Math.max(...floors) - Math.min(...floors)) * 2;
  const roomNums = selected.map(r => parseInt(r.number.slice(-2)));
  const horizontal = Math.max(...roomNums) - Math.min(...roomNums);
  return vertical + horizontal;
}

function findBestCombo(rooms, count) {
  const available = rooms.filter(r => !r.occupied);
  let bestCombo = null;
  let minTime = Infinity;

  for (let i = 0; i < available.length; i++) {
    const combo = [available[i]];
    for (let j = 0; j < available.length; j++) {
      if (i !== j && combo.length < count && !combo.includes(available[j])) {
        combo.push(available[j]);
      }
    }
    if (combo.length === count) {
      const time = calculateTravelTime(combo);
      if (time < minTime) {
        minTime = time;
        bestCombo = combo;
      }
    }
  }

  return bestCombo ? { success: true, rooms: bestCombo, time: minTime } : { success: false, message: 'No suitable room combo found' };
}

function previewBestRooms(count, date, type) {
  initializeDate(date);
  const rooms = roomMap.get(date).filter(r => r.type === type);
  return findBestCombo(rooms, count);
}

function bookRooms(count, date, type) {
  initializeDate(date);
  const rooms = roomMap.get(date).filter(r => r.type === type);
  const result = findBestCombo(rooms, count);
  if (result.success) {
    result.rooms.forEach(room => {
      const index = roomMap.get(date).findIndex(r => r.number === room.number);
      roomMap.get(date)[index].occupied = true;
    });
  }
  return result;
}

module.exports = {
  getRooms,
  bookRooms,
  resetRooms,
  randomOccupy,
  previewBestRooms,
  toggleRoom,
};
