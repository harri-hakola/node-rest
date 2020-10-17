const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Reservation = require('../models/reservation');
const Service = require('../models/service');

router.get('/', (req, res, next) => {
    Reservation.find()
    .populate('service')
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.post('/', (req, res, next) => {
    Service.findById(req.body.serviceId)
    .then(service => {
        if (!service) {
            return res.status(404).json({
                message: 'Service not found'
            });
        }
        const reservation = new Reservation({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            service: req.body.serviceId,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        });
        return reservation.save();
        })
        
        .then(result => {
            if(res.statusCode===404){
                return res;
            }
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
    });
  
  
});

router.get('/:reservationId', (req, res, next) => {
   Reservation.findById(req.params.reservationId)
   .populate('service')
   .exec()
   .then(reservation => {
       if(!reservation) {
           return res.status(404).json({
               message: 'Reservation not found'
           });
       }
       res.status(200).json({
           reservation: reservation,
           request: {
               type: 'GET',
               url: 'http://localhost:8080/reservations'
           }
       });
   })
   .catch(err => {
       res.status(500).json({
           error: err
       });
   });
});


router.delete('/:reservationId', (req, res, next) => {
    Reservation.remove({ _id: req.params.reservationId })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Reservation deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:8080/reservations',
                body: { serviceId: 'ID', quantity: 'Number' }
            }
    });
})
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;