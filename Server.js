const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
 
const app = express();
 
// Middleware
app.use(cors());
app.use(express.json());
 
// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Siri@2003',
    database: 'todo'
});
 
db.connect((err) => {
    if (err) {
        console.log(" Error connecting to the database:", err);
        return;
    }
    console.log(" Connected with database");
});
 
// Get all todo items
app.get('/', (req, res) => {
    db.query('SELECT * FROM todoItems', (err, result) => {
        if (err) {
            console.log(" Error occurred while fetching data:", err);
            return res.status(500).send("Error fetching data");
        }
        console.log("Data fetched:", result);
        res.json(result);
    });
});
 
// Add a new todo item
app.post('/add_item', (req, res) => {
    const { itemDescription } = req.body;
 
    if (!itemDescription) {
        return res.status(400).send(" itemDescription is required");
    }
 
    const query = `INSERT INTO todoItems (itemDescription) VALUES (?)`;
    db.query(query, [itemDescription], (err, results) => {
        if (err) {
            console.log(" Error occurred while inserting data:", err);
            return res.status(500).send("Error inserting data");
        }
        console.log("Todo item added successfully");
        res.send("Todo item added");
    });
});
 
// Start the server
app.listen(3000, () => {
    console.log('Server started running on port 3000');
});

 
 
 
