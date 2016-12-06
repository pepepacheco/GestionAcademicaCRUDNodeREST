var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * HTTP GET /Profesor
 * @argument {req} req 
 * @argument {req} res 
 * @argument {req} next
 * READ: findAll 
 * @returns {Listado de profesores en json}
 */
router.get('/Profesor', function(req, res, next) {
    var Profesor = mongoose.model('Profesor');    
    Profesor.find({}, function (err, profesores) {
    if (!err) {
      res.json(profesores);
    } else {
      res.json({});
    }
  }); 
});

/**
 * HTTP GET /Profesor
 * @argument {req} req 
 * @argument {req} res 
 * @argument {req} next
 * READ: findAll 
 * @returns {Listado de profesores en json}
 */
router.get('/Profesor/:id', function(req, res, next) {
    var Profesor = mongoose.model('Profesor');    
    Profesor.findOne({"_id":req.params.id}, function (err, profesor) {
    if (!err) {
      res.json(profesor);
    } else {
      res.json({});
    }
  }); 
});

/**
 * HTTP POST /Profesor
 * @argument {req} req 
 * @argument {req} res 
 * @argument {req} next
 * CREATE 
 */
router.post('/Profesor', function(req, res, next) {
    var Profesor = mongoose.model('Profesor');
    var datos = req.body;
    Profesor.create( datos,  function (err, profesor) {
            if (!err) {
                res.json(req.body);
            } else {
                res.send('Error');
                console.log(req.body);
            }
        }); 
});

/**
 * HTTP DELETE /Profesor
 * @argument {req} req 
 * @argument {req} res 
 * @argument {req} next
 * DELETE
 */
router.delete('/Profesor', function (req, res, next) {
    var id = req.body._id;
    var Profesor = mongoose.model('Profesor');
    Profesor.remove({"_id": id}, function (error, data){
        if (!error) {
            res.send("Exito");
        } else {
            res.send("Error!!!!");
        }
    });
});

/**
 * HTTP PUT /Profesor
 * @argument {req} req 
 * @argument {req} res 
 * @argument {req} next
 * findAll
 * @returns {Listado de profesores en json}
 */
router.put('/Profesor', function (req, res, next) {
    var Profesor = mongoose.model('Profesor');

    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var email = req.body.email;
    var id = req.body.id;
    var _id = req.body._id; 
    
    Profesor.update(
        {"_id": _id},
        {
            "nombre":nombre,
            "apellido":apellido,
            "email":email,
            "id":id
        },
        function (err, data) { 
            if (!err) {
                res.send('ok');
            } else {
                res.send('error');
            }
    });

});

module.exports = router;
