const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

function handleDate(dateInput) {
  let date;

  if (dateInput === undefined) {
    date = new Date();
  }
  else if (/^\d+$/.test(dateInput)) {
    const timestamp = parseInt(dateInput, 10);
    date = new Date(timestamp);
  }
  else {
    date = new Date(dateInput);
  }

  if (isNaN(date.getTime())) {
    return { error: "Invalid Date" };
  }

  return { unix: date.getTime(), utc: date.toUTCString() };
}

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  const result = handleDate(dateParam);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});