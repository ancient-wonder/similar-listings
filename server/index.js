const express = require('express');
const app = express();

app.use(express.static('client'));

app.listen(3004, () => console.log('listening on localhost:3004'));