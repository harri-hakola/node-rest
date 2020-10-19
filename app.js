const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const serviceRoutes = require('./routes/services');
const reservationRoutes = require('./routes/reservations');
const userRoutes = require('./routes/users');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/services', serviceRoutes);
app.use('/reservations', reservationRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status= 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

//Yhteys tietokantaan
const mongoose_url = 'mongodb+srv://reservationdb:kwENGj6AdHYIeDJA@cluster0.4kvam.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoose_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true
}).then(() => {
    console.log('DB connected');
    app.listen(8080);
});

