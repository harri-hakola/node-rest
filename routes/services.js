const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Service = require('../models/service');

//Get all services
router.get('/', (req, res, next) => {
    Service.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs); //200; OK
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ //500; Generic server error
            error: err
        });
    })
});

//Add service
router.post('/', (req, res, next) => {
    const service = new Service({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price

    });
    service.save().then(result => {
        console.log(result);
        res.status(201).json({ //201; Created OK
            message:"Created service successfully",
            createdService: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ //500; Generic server error
                error: err
            });
        });         
       
   
    
});

//Get service by ID
router.get('/:serviceId', (req,res,next) => {
    const id = req.params.serviceId;
    Service.findById(id)
    .exec()
    .then(doc => {
        console.log("Tietokannasta", doc);
        if (doc) {
            res.status(200).json(doc); //200; OK
        } else {
            res.status(404).json({message: 'ID Not found'}); //404; Not Found
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err}); //500; Generic server error
    });
});


//Modify service with ID
router.patch('/:serviceId', (req,res,next) => {
    const id = req.params.serviceId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Service.update({_id: id}, { $set: updateOps })
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


//Delete service by ID
router.delete('/:serviceId', (req,res,next) => {
    const id = req.params.serviceId;
    Service.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result); //200; OK
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ //500; Generic server error
            error: err
        });
    });
  
});

module.exports = router;