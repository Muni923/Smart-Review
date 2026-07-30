const express = require('express');
const app = express();

const mongoConnect = require('./config/mongoConnect')
mongoConnect();

const { PORT } = require('./config/config');

app.use(express.json());

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));

