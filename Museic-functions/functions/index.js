const functions = require("firebase-functions");

const app = require("express")();


const { getUsuarios , postUsuario, getPublicaciones, crearPublicacion } = require('./handlers/publicaciones');
const { signupUsuario, loginUsuario, signupArtista, 
        subirFotoPerfilUsuario} = require('./handlers/usuarios');
const FBAuth = require("./utilidades/fbauth");
const { admin } = require("./utilidades/administrador");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

//funciones trasladada a publicaciones.js
//funciones publicaciones

app.get("/publicaciones", getUsuarios);
app.post("/publicaciones", postUsuario);
app.get("/getPublicaciones", getPublicaciones);
app.post("/crearPublicacion",FBAuth, crearPublicacion);
//funciones trasladadas a usuarios.js
//funciones users

app.post("/signupUsuario", signupUsuario);
app.post("/loginUsuario", loginUsuario);
app.post("/signupArtista", signupArtista);
app.post("/usuario/FotoPerfil", FBAuth, subirFotoPerfilUsuario);



exports.api = functions.https.onRequest(app);
