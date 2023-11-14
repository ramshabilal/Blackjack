import express from 'express';
const app = express();

// to parse json bodies, uncomment the following line:
app.use(express.json())

import url from 'url';
import path from 'path';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));

// Define a simple array to store the history
const gameHistory = [];

// Define an API endpoint to get game history
app.get('/api/game-history', (req, res) => {
  res.json(gameHistory);
});


app.listen(3000);
