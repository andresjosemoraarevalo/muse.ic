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

// Ruta de inicio de sesión
app.post("/signup", (request, response) => {
  const newUsuario = {
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    username: request.body.username,
  };

  // TODO validate data


  db.doc("/Usuarios/${newUsuario.username}")
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
      return data.user.getIdToken();
    })
  .then((token) => {
    return response.status(201).json({ token });
  }).catch((err) => {
    console.error(err);
    return response.status(500).json({ error: err.code });
  });
});
exports.api = functions.https.onRequest(app);
