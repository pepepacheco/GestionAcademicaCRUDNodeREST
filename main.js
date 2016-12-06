/* global nombres */

// Cargamos el modelo implementado con Mongoose

var db = require('./model/db.js');
var profesor = require('./model/profesor.js');
var mongoose = require('mongoose');

var Profesor = mongoose.model('Profesor');

var generador = require('./generador-personas.js');

var personas = generador.generador(205);

console.log(personas);

Profesor.collection.insert( personas,  function (err, profesor) {
    if (!err) {
        console.log('Usuarios creados.'+profesor);
    } else {
        console.log('Error');
    }
});

