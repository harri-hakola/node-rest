const express = require('express');
const app = express();

const serviceRoutes = require('./routes/services');
const reservationRoutes = require('./routes/reservations');

app.use('/services', serviceRoutes);
app.use('/reservations', reservationRoutes);

app.listen(8080);

//https://www.youtube.com/watch?v=UVAMha41dwo
//https://www.youtube.com/c/Academind/videos