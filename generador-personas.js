
function aleatorio(tamano)  {
    return ( Math.floor(Math.random() * tamano) ); 
}

function quitaAcentos(palabra){
    palabra = palabra.toString().toLowerCase();
    palabra = palabra.replace(/á/gi,'a');
    palabra = palabra.replace(/é/gi,'e');
    palabra = palabra.replace(/í/gi,'i');
    palabra = palabra.replace(/ó/gi,'o');
    palabra = palabra.replace(/ú/gi,'u');
    palabra = palabra.replace(/ñ/gi,'n');
    palabra = palabra.replace(/ç/gi,'ç');
    // console.log(palabra);
    return palabra;
}

function generaDNI() {
    var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
    var dni = aleatorio(100000000);
    var letra = dni % 23;
    
    return (dni+letras[letra]);
}
    
module.exports = {
    generador : function(cuantas){
        var nombres = [ 'Pedro', 'Juan', 'Pablo', 'Miguel', 'Jacinto', 'José', 'Samuel', 'Ángel', 'Ramón', 'Julian', 'Lola', 'María', 'Antonia', 'Josefa', 'Teresa', 'Manuela', 'Inmaculada'];
        var apellidos = [ 'Antón', 'Baeza', 'Caparrós', 'Díaz' , 'Esteban', 'Fernández' , 'García' , 'Heredia' , 'Iniesta', 'Jiménez', 'Lara', 'Martínez', 'Navarro', 'Ortega', 'Pérez', 'Peña', 'Quesada', 'Ruiz', 'Sánchez', 'Toledano', 'Ureña', 'Vega', 'Yeguas', 'Zamorano' ];
        var dominios = [ '@sincorreo.es', '@concorreo.es', '@sindominio.com', '@condominio.com', '@sinemilio.es', '@conemilio.es'];
        console.log('Nombres disponibles: '+ nombres.length);
        console.log('Apellidos disponibles: '+ apellidos.length);
        console.log('Dominios disponibles: '+ dominios.length);

        var personas = [];
        var persona;
        var nombre, apellido1, apellido2, email;

        for (var i=0; i<cuantas; i++ ) {
            nombre=nombres[aleatorio(nombres.length)];
            apellido1=apellidos[aleatorio(apellidos.length)];
            apellido2=apellidos[aleatorio(apellidos.length)];
            email=quitaAcentos(nombre[0]+apellido1.toLowerCase()+apellido2.toLowerCase()+dominios[aleatorio(dominios.length)]);
            
            persona = {
                "nombre": nombre,
                "apellido": apellido1+" "+apellido2,
                "email":email,
                "id": generaDNI()
            };
            personas.push(persona);
        }
        return personas;
    }
};


