const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Reservation = require('../models/reservation');
const Service = require('../models/service');

//Get all reservations
router.get('/', (req, res, next) => {
    Reservation.find()
    .populate('service')
    .exec()
    .then(docs => {
        res.status(200).json(docs); //200; OK
    })
    .catch(err => {
        res.status(500).json({ //500; Generic server error
            error: err
        })
    });
});

//Add reservation
router.post('/', (req, res, next) => {
    Service.findById(req.body.serviceId)
    .then(service => {
        if (!service) {
            return res.status(404).json({ //404; Not found
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
            if(res.statusCode===404){ //404; Not found
                return res;
            }
            console.log(result);
            res.status(201).json(result); //201; Created OK
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ //500; Generic server error
                error: err
            });
    });
  
  
});

//Get reservation by ID
router.get('/:reservationId', (req, res, next) => {
   Reservation.findById(req.params.reservationId)
   .populate('service')
   .exec()
   .then(reservation => {
       if(!reservation) {
           return res.status(404).json({ //404; Not found
               message: 'Reservation not found'
           });
       }
       res.status(200).json({ //200; OK
           reservation: reservation,
           request: {
               type: 'GET',
               url: 'http://localhost:8080/reservations'
           }
       });
   })
   .catch(err => {
       res.status(500).json({ //500; Generic server error
           error: err
       });
   });
});

//Modify reservation by ID
router.patch('/:reservationId', (req,res,next) => {
    const id = req.params.reservationId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Reservation.update({_id: id}, { $set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result); //200; OK
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ //500; Generic server error
            error: err
        })
    });
});

//Delete reservation by ID
router.delete('/:reservationId', (req, res, next) => {
    Reservation.remove({ _id: req.params.reservationId })
    .exec()
    .then(result => {
        res.status(200).json({ //200; OK
            message: 'Reservation deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:8080/reservations',
                body: { serviceId: 'ID', quantity: 'Number' }
            }
    });
})
    .catch(err => {
        res.status(500).json({ //500; Generic server error
            error: err
        });
    });
});

module.exports = router;