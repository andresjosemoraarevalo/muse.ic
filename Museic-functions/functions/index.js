const functions = require("firebase-functions");

const app = require("express")();

const {
  getUsuarios,
  postUsuario,
  getPublicaciones,
  crearPublicacion,
  getPublicacion,
  comentarPublicacion,
} = require("./handlers/publicaciones");
const {
  signupUsuario,
  loginUsuario,
  signupArtista,
  addUserDetails,
  getUsuarioAutenticado,
  subirFotoPerfilUsuario,
  subirFotoPerfilArtista,
} = require("./handlers/usuarios");
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
app.post("/crearPublicacion", FBAuthUsuarios, crearPublicacion);
app.get("/publicaciones/:postId", getPublicacion);
//TODO: delete publicacion
//TODO: like publicacion
//TODO: unlike publicacion
app.post("/publicaciones/:postId/comentar", FBAuthUsuarios, comentarPublicacion)
//funciones trasladadas a usuarios.js
//funciones users

app.post("/signupUsuario", signupUsuario);
app.post("/loginUsuario", loginUsuario);
app.post("/signupArtista", signupArtista);
app.post("/usuario/FotoPerfil", FBAuthUsuarios, subirFotoPerfilUsuario);
app.post("/artista/FotoPerfil", FBAuthArtistas, subirFotoPerfilArtista);
app.post("/usuarioDetails", FBAuthUsuarios, addUserDetails);
app.get("/Usuario", FBAuthUsuarios, getUsuarioAutenticado);

exports.api = functions.https.onRequest(app);
