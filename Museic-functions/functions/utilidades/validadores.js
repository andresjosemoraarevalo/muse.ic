//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
/*
isEmail:
parametros: un string con un posible email
salida: booleano que dice si es o no un correo electronico 
Descripción: Esta función describe si un string es un correo usando una 
            expresion regular
*/
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
};

/*
isEmpty:
parametros: una cadena de caracteres 
salida: booleano que dice si esta vacio o no 
Descripción:Esta función dice si un string esta vacio o no
*/

const isEmpty = (string) => {
    if (string.trim() == '') return true;
    else return false;
}

// valida si el usuario ya existe en la colección "Usuarios"
exports.validarDatosdeSignup = (datos) => {
        let errors = {}; //Inicializar el objeto error (en caso de que algún atributo esté vacio)

    if (isEmpty(datos.email)) {
        errors.email = 'No debe estar vacio'
    } else if (!isEmail(datos.email)) {
        errors.email = 'La dirección de correo electrónico debe ser valida'
    }

    if (isEmpty(datos.password)) errors.password = 'No debe estar vacio';

    if (datos.password !== datos.confirmPassword)
        errors.confirmPassword = 'Las contraseñas deben ser iguales';
    if (isEmpty(datos.username)) errors.username = 'No debe estar vacio';
    
    return {
        errors,  
        valido : Object.keys(errors).length === 0 ? true : false 
    }
}

exports.validarDatosdeLogin = (datos) => {
    let errors = {};

    if (isEmpty(datos.email)) errors.email = "No debe de estar vacio";
    if (isEmpty(datos.password)) errors.password = "No debe de estar vacio";
      return {
        errors, 
        valido : Object.keys(errors).length === 0 ? true : false 
    }
}

exports.reduceUserDetails = (data) => {
    let userDetails = {};
    if(!isEmpty(data.nombre.trim())) userDetails.nombre = data.nombre;
    if(!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
    let gustos = {};
    gustos = data.gustosMusicales;
    userDetails.gustosMusicales = gustos;

    return userDetails;
}

exports.soloDetails = (data) => {
    let userDetails = {};
    if(!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
    return userDetails;
}