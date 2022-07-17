const express = require('express');
const mongoose = require('mongoose');
const Env = require('./config');
const authRouter = require('./routes/auth');
const app = express();
app.use(express.json());

//middleware
app.use('/api', authRouter);

//connection to database
mongoose.connect(Env.MONGO_URI)
.then(() => {
    console.log('Connected to MONGODB..');
});

app.listen(Env.SERVER_PORT, () => {
    console.log(`Server running on PORT: ${Env.SERVER_PORT}..`)
});