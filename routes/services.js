const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /services'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to /services'
    });
});

router.get('/:serviceId', (req,res,next) => {
    const id = req.params.serviceId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:serviceId', (req,res,next) => {
        res.status(200).json({
            message: 'Updated service'
        });   
});

router.delete('/:serviceId', (req,res,next) => {
    res.status(200).json({
        message: 'Deleted service'
    });   
});

module.exports = router;