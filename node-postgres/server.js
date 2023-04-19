const express = require('express');
const bodyParser = require('body-parser');

// const pool = require('./db');
const NotesRoutes = require('./Routes/NotesRoutes');
const UserRoutes = require('./Routes/UserRoutes');

const app = express();
app.listen(4000, () => console.log('Server started'));

app.use(bodyParser.json());

// app.set('pool', pool);

app.use('/notes', NotesRoutes);
app.use('/users', UserRoutes);


// console.log(pool)

