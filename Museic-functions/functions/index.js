const functions = require("firebase-functions");

const app = require("express")();


const { getUsuarios , postUsuario, getPublicaciones, crearPublicacion } = require('./handlers/publicaciones');
const { signupUsuario, loginUsuario, signupArtista, 
        subirFotoPerfilUsuario, subirFotoPerfilArtista} = require('./handlers/usuarios');
const FBAuthUsuarios = require("./utilidades/fbauthUsuarios");
const FBAuthArtistas = require("./utilidades/fbauthArtistas");
const { admin } = require("./utilidades/administrador");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

//funciones trasladada a publicaciones.js
//funciones publicaciones

app.get("/publicaciones", getUsuarios);
app.post("/publicaciones", postUsuario);
app.get("/getPublicaciones", getPublicaciones);
app.post("/crearPublicacion",FBAuthUsuarios, FBAuthArtistas, crearPublicacion);
//funciones trasladadas a usuarios.js
//funciones users

app.post("/signupUsuario", signupUsuario);
app.post("/loginUsuario", loginUsuario);
app.post("/signupArtista", signupArtista);
app.post("/usuario/FotoPerfil", FBAuthUsuarios, subirFotoPerfilUsuario);
app.post("/artista/FotoPerfil", FBAuthArtistas, subirFotoPerfilArtista);



exports.api = functions.https.onRequest(app);
