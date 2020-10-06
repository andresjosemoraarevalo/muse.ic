const functions = require("firebase-functions");

const app = require("express")();

const FBauth = require('./utilidades/fbauth');

const { getUsuarios , postUsuario } = require('./handlers/publicaciones');
const { signupUsuario, loginUsuario, signupArtista, 
        subirFotoPerfilUsuario} = require('./handlers/usuarios');
const fbauth = require("./utilidades/fbauth");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

//funciones trasladada a usuarios.js
//funciones publicaciones

app.get("/publicaciones", getUsuarios);
app.post("/publicaciones", postUsuario);

//funciones trasladadas a users.js
//funciones users

app.post("/signupUsuario", signupUsuario);
app.post("/loginUsuario", loginUsuario);
app.post("/signupArtista", signupArtista);
app.post("/usuario/FotoPerfil", FBauth, subirFotoPerfilUsuario);


exports.api = functions.https.onRequest(app);
