const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();
admin.initializeApp();
const config = {
  apiKey: "AIzaSyADNStdDaRzHgMc9TtyR0-_8LBd2YR15hI",
  authDomain: "muse-ic.firebaseapp.com",
  databaseURL: "https://muse-ic.firebaseio.com",
  projectId: "muse-ic",
  storageBucket: "muse-ic.appspot.com",
  messagingSenderId: "461054247985",
  appId: "1:461054247985:web:14f138f643aa4d9c4c4110",
  measurementId: "G-E1YDHYL8XW",
};
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const firebase = require("firebase");
const { json } = require("express");
firebase.initializeApp(config);

const db = admin.firestore();
/*
 getUsuarios:
 Parametros: No
 Salidas: archivo .json con los usuarios de la base de datos
 Descripción: Esta función retorna en un archivo los datos de la colección "Usuarios" 
  */
app.get("/Usuarios", (request, response) => {
   
  db.collection("Usuarios")
    .orderBy("username", "desc")
    .get()
    .then((data) => {
      let usuarios = [];
      data.forEach((doc) => {
        usuarios.push({
          usuarioId: doc.id,
          username: doc.data().username,
          Nombre: doc.data().Nombre,
          FechaNacimiento: doc.data().FechaNacimiento,
          contraseña: doc.data().contraseña,
          interesesMusicales: doc.data().interesesMusicales,
          Fotolink: doc.data().Fotolink,
          email: doc.data().email
        });
      });
      return response.json(usuarios);
    })
    .catch((err) => console.error(err));
});

/*
Usuario:
Parametros: (Post) un archivo JSON con los datos del nuevo usuario 
Salidas: un request
Descripción: Esta función crea un usuario a partir de los datos recibidos en el .json 
y lo guarda en la base de datos en la colección correspondiente 
 */
app.post("/Usuario", (request, response) => {
  const newUsuario = {
    username: request.body.username,
    Fotolink: request.body.Fotolink,
    Nombre: request.body.Nombre,
    interesesMusicales: request.body.interesesMusicales, // Aún no guarda la lista
    FechaNacimiento: request.body.FechaNacimiento, // Aún no guarda la fecha de nacimiento
    contraseña: request.body.contraseña,
  };
  db.collection("Usuarios")
    .add(newUsuario)
    .then((doc) => {
      response.json({ message: "document ${doc.id} creado exitosamente" });
    })
    .catch((err) => {
      response.status(500).json({ error: "algo salió mal" });
      console.error(err);
    });
});

/*
isEmail:
parametros: un string con un posible email
salida: booleano que dice si es o no un correo electronico 
Descripción: Esta función describe si un string es un correo usando una expresion regular
*/
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
/*
signupUsario
parametros: un documento json con la estructura de crear usuario:
  - correo electronico
  - contraseña 
  - confirmación de contraseña 
  - nombre de usuario
salida: mensaje .json del resultado del procedimiento respecto a las entradas y los datos de la 
base de datos.
*/
app.post("/signupUsuario", (request, response) => {
  const newUsuario = {
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    username: request.body.username,
  }

  let errors = {}; //Inicializar el objeto error (en caso de que algún atributo esté vacio)

  if (isEmpty(newUsuario.email)) {
    errors.email = 'No debe estar vacio'
  } else if (!isEmail(newUsuario.email)) {
    errors.email = 'La dirección de correo electrónico debe ser valida'
  }

  if (isEmpty(newUsuario.password)) errors.password = 'No debe estar vacio';

  if (newUsuario.password !== newUsuario.confirmPassword)
    errors.confirmPassword = 'Las contraseñas deben ser iguales';
  if (isEmpty(newUsuario.username)) errors.username = 'No debe estar vacio';

  if (Object.keys(errors).length > 0)
    return response.status(400).json(errors);

  // valida si el usuario ya existe en la colección "Usuarios"

  let token, userId;
  db.doc(`/Usuarios/${newUsuario.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return response
          .status(400)
          .json({ username: "Este nombre de usuario ya está en uso" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(
            newUsuario.email,
            newUsuario.password
          );
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        username: newUsuario.username,
        email: newUsuario.email,
        userId,
      };
      return db.doc(`/Usuarios/${newUsuario.username}`).set(userCredentials);
    })
    .then(() => {
      return response.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code == "auth/email-already-in-use") {
        return response.status(400).json({ email: "Email a está en uso" });
      } else if (err.code == "auth/weak-password"){
        return response.status(400).json({ password: "contraseña demasiado debil" });
      }else {
        return response.status(500).json({ error: err.code });
      }
    });
});

/*
signupArtista
parametros: un documento json con la estructura de crear Artista:
  - correo electronico
  - contraseña 
  - confirmación de contraseña 
  - nombre de usuario
salida: mensaje .json del resultado del procedimiento respecto a las entradas y los datos de la 
base de datos.
*/
app.post("/signupArtista", (request, response) => {
  const newArtista = {
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    username: request.body.username,
  }

  let errors = {}; //Inicializar el objeto error (en caso de que algún atributo esté vacio)

  if (isEmpty(newArtista.email)) {
    errors.email = 'No debe estar vacio'
  } else if (!isEmail(newArtista.email)) {
    errors.email = 'La dirección de correo electrónico debe ser valida'
  }

  if (isEmpty(newArtista.password)) errors.password = 'No debe estar vacio';

  if (newArtista.password !== newArtista.confirmPassword)
    errors.confirmPassword = 'Las contraseñas deben ser iguales';
  if (isEmpty(newArtista.username)) errors.username = 'No debe estar vacio';

  if (Object.keys(errors).length > 0)
    return response.status(400).json(errors);

  // valida si el artista ya existe en la colección "Artistas"

  let token, userId;
  db.doc(`/Artistas/${newArtista.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return response
          .status(400)
          .json({ username: "Este nombre de artista ya está en uso" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(
            newArtista.email,
            newArtista.password
          );
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        username: newArtista.username,
        email: newArtista.email,
        userId,
      };
      return db.doc(`/Artistas/${newArtista.username}`).set(userCredentials);
    })
    .then(() => {
      return response.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code == "auth/email-already-in-use") {
        return response.status(400).json({ email: "Email a está en uso" });
      } else if (err.code == "auth/weak-password"){
        return response.status(400).json({ password: "contraseña demasiado debil" });
      }else {
        return response.status(500).json({ error: err.code });
      }
    });
});
/*
loginUsuario
parametros: un archivo .json con los siguientes atributos:
- email: correo electronico con el que se registra 
- contraseña: la contraseña asociada 
*/
app.post('/loginUsuario',(request, response)=>{
  const user={
    email: request.body.email,
    password: request.body.password
  };
  var usuarioValido= false; 
  let errors={};
  let usuarios = [];
  if(isEmpty(user.email)) errors.email= "No debe de estar vacio";
  if(isEmpty(user.password)) errors.password= "No debe de estar vacio";
  // Aca se valida si es un usuario
  db.collection("Usuarios")
  .get()
  .then((data) => {
    
    data.forEach((doc) => {
      console.log("Document data:", doc.data());
      if(doc.data().email == request.body.email){
        usuarioValido= true;
      };
    });
  });
  if(usuarioValido === false ) {
    errors.email= "datos incorrectos, intente de nuevo ";
    return response.json(usuarios);
  }
  
  /*if(Object.keys(errors).length>0) return response.status(400).json(errors);

  firebase.auth().signInWithEmailAndPassword(user.email,user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
        return response.json({token})
    })
    .catch( err => {
      console.error(err);
      if(err.code == 'auth/wrong-password' ){
        return response.status(403).json({general: "Datos incorrectos, por favor intente nuevamente"});
      } else if (err.code == 'auth/user-not-found'){
        return response.status(403).json({general: "Datos incorrectos, por favor intente nuevamente"});
      }else{
          return response.status(500).json({error: err.code });
      }
      
    });*/
});

exports.api = functions.https.onRequest(app);
