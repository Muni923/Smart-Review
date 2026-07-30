const express = require('express');
const app = express();

const { PORT } = require('./config/config');

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));

