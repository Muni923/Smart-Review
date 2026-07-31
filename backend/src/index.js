const express = require('express');
const app = express();

const userRouter=require('./routes/user-routes')
const mongoConnect = require('./config/mongoConnect')
mongoConnect();

const { PORT } = require('./config/config');

app.use(express.json());
app.use('/user',userRouter);

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));

 