const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    quantity: { type: Number, default: 1 },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true}  
});

module.exports = mongoose.model('Reservation', reservationSchema);