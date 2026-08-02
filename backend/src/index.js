const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/user-routes');
const aiRouter=require('./routes/ai-routes');
const {reactURL} = require('./config/config');

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const mongoConnect = require('./config/mongoConnect');
mongoConnect();

const { PORT } = require('./config/config');

app.use(
  cors({
    origin: reactURL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', userRouter);
app.use('/ai', aiRouter);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));

