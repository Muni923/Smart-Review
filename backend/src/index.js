const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/user-routes')
const mongoConnect = require('./config/mongoConnect')
mongoConnect();

const { PORT } = require('./config/config');

app.use(
  cors({
    origin: "http://localhost:5173", // Your React frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', userRouter);

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));

