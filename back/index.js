const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const { readFileSync } = require('fs');

app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});

// partie front on a un fichier de data.ts qui expose du json
// on veut que le json soit renvoyer via le backend en express
// sur un chemin url on renvoie le json

app.get('/todos', (req, res) => {
    const data = readFileSync('./data.json', {
        encoding: 'utf8',
        flag: 'r'
    });
    res.send(JSON.parse(data));
});