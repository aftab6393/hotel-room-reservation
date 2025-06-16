const express = require('express');
const cors = require('cors');
const {
  getRooms,
  bookRooms,
  resetRooms,
  randomOccupy,
  previewBestRooms,
  toggleRoom
} = require('./logic/bookingLogic');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/rooms', (req, res) => {
  const { date } = req.query;
  res.json(getRooms(date));
});

app.post('/api/book', (req, res) => {
  const { count, date, type } = req.body;
  res.json(bookRooms(count, date, type));
});

app.post('/api/reset', (req, res) => {
  const { date } = req.body;
  resetRooms(date);
  res.sendStatus(200);
});

app.post('/api/random', (req, res) => {
  const { date } = req.body;
  randomOccupy(date);
  res.sendStatus(200);
});

app.post('/api/preview', (req, res) => {
  const { count, date, type } = req.body;
  res.json(previewBestRooms(count, date, type));
});

app.post('/api/toggle', (req, res) => {
  const { date, number } = req.body;
  const result = toggleRoom(date, number);
  res.json(result);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
