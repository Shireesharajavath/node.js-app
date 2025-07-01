const express = require('express');
const cors = require('cors'); 
const app = express();
const mysql = require('mysql2');

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Fix: Missing comma after password
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Siri@2003',
    database: 'testdb' // ✅ Fix: Add missing comma above
});

// ✅ Fix: Incorrect arrow function syntax
db.connect((err) => {
    if (err) {
        console.log("❌ Error connecting to the database");
        return;
    }
    console.log("✅ Connected with database");
});

app.get('/', (req, res) => {
    console.log('Default Route');
    res.send("Hello from backend!"); // ✅ Fix: You forgot to send a response
});

// ✅ Fix: Typo in route ('/add.item' => '/add-item') and 'rer' => 'res'
app.post('/add-item', (req, res) => {
    const { name } = req.body;

    const query = 'INSERT INTO your_table_name (column_name) VALUES (?)';

    db.query(query, [name], (err, result) => {
        if (err) {
            console.error("❌ Error inserting data:", err);
            return res.status(500).send("Database insert failed");
        }

        res.send("✅ Item added to database!");
    });
});

app.listen(3000, () => {
    console.log('🚀 Server started running on port 3000');
});
