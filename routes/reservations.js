const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Reservations fetched'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Reservation was created'
    });
});

router.get('/:reservationId', (req, res, next) => {
    res.status(200).json({
        message: 'Reservation details',
        reservationId: req.params.reservationId
    });
});


router.delete('/:reservationId', (req, res, next) => {
    res.status(200).json({
        message: 'Reservation deleted',
        reservationId: req.params.reservationId
    });
});

module.exports = router;