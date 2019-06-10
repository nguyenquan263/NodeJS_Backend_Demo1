var express = require('express');
var router = express.Router();

var model = require('../models/index');

router.get('/', function(req, res, next) {
    return model.student.findAll({})
    .then(students => res.json({
        error: 0,
        message: 'This is the student list.',
        data: students
    }))
    .catch(error => res.json({
        error: 1,
        message: 'Database error.',
        data: []
    }));
});

router.get('/:id', function(req, res, next) {
    console.log(req.params.id);

    return model.student.findOne({
        where: {id: req.params.id}
    })
    .then(student => res.json({
        error: 0,
        message: 'The student with id equal to ' + req.params.id,
        data: student
    }))
    .catch(error => res.json({
        error: 1,
        message: 'Database error.',
        data: error
    }));
});

router.post('/', function(req, res, next) {
    var name = req.body.name;
    var gpa = req.body.gpa;
    var dob = new Date(req.body.dob);
    var address = req.body.address;
    
    return model.student.create({
        name: name,
        gpa: gpa,
        dob: new Date(dob),
        address: address    
    })
    .then(result => res.json({
        error: 0,
        message: 'This student has been added.',
        data: result
    }))
    .catch(error => res.json({
        error: 1,
        message: 'Database error.',
        data: []
    }));
})

router.delete('/:id', function(req, res, next) {
    var targetID = req.params.id;

    return model.student.destroy({
        where: { id: targetID }
    })
    .then(result => res.json({
        error: 0,
        message: 'This student has been deleted.',
        data: []
    }))
    .catch(error => res.json({
        error: 1,
        message: 'Database error.',
        data: error
    }));
});

router.put('/:id', function(req, res, next) {
    var name = req.body.name;
    var gpa = req.body.gpa;
    var dob = new Date(req.body.dob);
    var address = req.body.address;

    return model.student.update({
        name: name,
        gpa: gpa,
        dob: new Date(dob),
        address: address 
    },{
        where: {id: req.params.id}
    })
    .then(updatedStudent => res.json({
        error: 0,
        message: 'This student has been updated.',
        data: {
            id: req.params.id,
            name: name,
            gpa: gpa,
            dob: new Date(dob),
            address: address
        }
    }))
    .catch(error => res.json({
        error: 1,
        message: 'Database error.',
        data: error
    }));
});



module.exports = router;