const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRoute = require('./routes/auth');
const todoRoute = require('./routes/todo');
const { createSchema } = require('./schema/createSchema');

const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(morgan('dev'));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.get('/', (req, res) => {
   res.send('hello from simple server :)');
});

app.use('/api/auth', authRoute);
app.use('/api', todoRoute);

async function startServer() {
   createSchema().then(() => {
   app.listen(port, () => console.log(`> Server is up and running on port: ${port}`));
})
}

startServer();
