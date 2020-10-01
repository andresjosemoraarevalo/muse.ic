const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express")();
admin.initializeApp();
const firebaseConfig = {
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
firebase.initializeApp(config);

/*
 getUsuarios:
 Parametros: No
 Salidas: archivo .json con los usuarios de la base de datos
 Descripción: Esta función retorna en un archivo los datos de la colección "Usuarios" 
  */
app.get("/Usuarios", (request, response) => {
  admin
    .firestore()
    .collection("Usuarios")
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
        });
      });
      return response.json(usuarios);
    })
    .catch((err) => console.error(err));
});

/*
CreateUsuario:
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
  admin
    .firestore()
    .collection("Usuarios")
    .add(newUsuario)
    .then((doc) => {
      response.json({ message: "document ${doc.id} creado exitosamente" });
    })
    .catch((err) => {
      response.status(500).json({ error: "algo salió mal" });
      console.error(err);
    });
});

// Ruta de inicio de sesión
app.post("/signup", (req, res) => {
  const newUsuario = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    username: req.body.username,
  };

  // TODO validate data
  firebase
    .auth()
    .createUserWithEmailAndPassword(newUsuario.email, newUsuario.password)
    .then((data) => {
      return res
        .status(201)
        .json({
          message: "Usuario ${data.user.uid} inició sesión exitosamente",
        });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
});
exports.api = functions.https.onRequest(app);
