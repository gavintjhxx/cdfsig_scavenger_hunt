const express = require('express');
const path = require('path');
const puzzles = require("./puzzles");

const app = express();

// Set up the view engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

// Serve static files from the /public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send("hello... why are u here...? The hint isn't here...")
});

// Dynamically handling puzzle queries
app.get('/puzzle/:id', (req, res) => {
    const puzzleData = puzzles.find(p => p.hash === req.params.id);
    if (!puzzleData) {
        res.status(404).send("Puzzle not found.. don't try to bruteforce, they're encoded... LOL");
        return;
    }
    res.render('puzzle', { 
        imageUrl: puzzleData.imagePath, 
        question: puzzleData.question 
    });
});

// Web Server Listener stuff
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});