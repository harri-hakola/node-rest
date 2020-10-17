const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Service = require('../models/service');

router.get('/', (req, res, next) => {
    Service.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});

router.post('/', (req, res, next) => {
    const service = new Service({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price

    });
    service.save().then(result => {
        console.log(result);
        res.status(201).json({
            message:"Created service successfully",
            createdService: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });         
       
   
    
});

router.get('/:serviceId', (req,res,next) => {
    const id = req.params.serviceId;
    Service.findById(id)
    .exec()
    .then(doc => {
        console.log("Tietokannasta", doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'ID Not found'});
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});



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
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});



router.delete('/:serviceId', (req,res,next) => {
    const id = req.params.serviceId;
    Service.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
  
});

module.exports = router;