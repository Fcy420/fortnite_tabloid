const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    
  res.sendFile(__dirname + '/public/test.html');
});


app.get('/get', (req, res) => {
    try {
        const current_date = new Date().toISOString().split('T')[0].slice(2);
        console.log(current_date);
        const tabloidData = fs.readFileSync(`./public/loids/${current_date}.json`, 'utf8');
        res.json(JSON.parse(tabloidData));
    } catch (error) {
        res.status(404).json({
            error: 'Tabloid not found for today',
            message: error.message
        });
    }
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
