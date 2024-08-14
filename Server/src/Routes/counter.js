const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.join(__dirname, '../counter.json');


const readCounter = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(data);
        return json.count;
    } catch (error) {
        console.error('Error reading counter file:', error);
        return 0; 
    }
};


const writeCounter = (count) => {
    try {
        const json = { count };
        fs.writeFileSync(filePath, JSON.stringify(json, null, 2)); 
    } catch (error) {
        console.error('Error writing counter file:', error);
    }
};


router.get('/', (req, res) => {
    const count = readCounter();
    res.json({ count });
});


router.post('/increment', (req, res) => {
    let count = readCounter();
    count += 1;
    writeCounter(count);
    res.json({ count });
});

module.exports = router;
