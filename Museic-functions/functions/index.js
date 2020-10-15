const functions = require("firebase-functions");

const app = require("express")();

const {
  getUsuarios,
  postUsuario,
  getPublicaciones,
  crearPublicacion,
  getPublicacion,
  comentarPublicacion,
  likePublicacion,
  unlikePublicacion,
  deletePublicacion
} = require("./handlers/publicaciones");
const {
  signupUsuario,
  loginUsuario,
  signupArtista,
  addUserDetails,
  getUsuarioAutenticado,
  subirFotoPerfilUsuario,
  subirFotoPerfilArtista,
  followUsuario,
  unfollowUsuario,
  getUserDetails
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
app.delete("/publicaciones/:postId", FBAuthUsuarios, deletePublicacion);
app.get("/publicaciones/:postId/like", FBAuthUsuarios, likePublicacion);
app.get("/publicaciones/:postId/unlike", FBAuthUsuarios, unlikePublicacion);
app.post("/publicaciones/:postId/comentar", FBAuthUsuarios, comentarPublicacion);
//funciones trasladadas a usuarios.js
//funciones users

app.post("/signupUsuario", signupUsuario);
app.post("/loginUsuario", loginUsuario);
app.post("/signupArtista", signupArtista);
app.post("/usuario/FotoPerfil", FBAuthUsuarios, subirFotoPerfilUsuario);
app.post("/artista/FotoPerfil", FBAuthArtistas, subirFotoPerfilArtista);
app.post("/usuarioDetails", FBAuthUsuarios, addUserDetails);
app.get("/Usuario", FBAuthUsuarios, getUsuarioAutenticado);
app.get("/usuario/:username", getUserDetails);
app.get("/usuario/:username/follow", FBAuthUsuarios, followUsuario);
app.get("/usuario/:username/unfollow", FBAuthUsuarios, unfollowUsuario);

exports.api = functions.https.onRequest(app);
