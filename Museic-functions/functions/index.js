const functions = require("firebase-functions");

const app = require("express")();

const cors = require('cors');
app.use(cors());

const {
  getUsuarios,
  postUsuario,
  getPublicaciones,
  crearPublicacion,
  getPublicacion,
  comentarPublicacion,
  likePublicacion,
  unlikePublicacion,
  deletePublicacion,
  editPublicacion,
  dontLikePublicacion,
  undoDontlikePublicacion,
} = require("./handlers/publicaciones");
const {
  signupUsuario,
  loginUsuario,
  loginArtista,
  ObtenerUserName,
  signupArtista,
  addUserDetails,
  getUsuarioAutenticado,
  subirFotoPerfilUsuario,
  subirFotoPerfilArtista,
  followUsuario,
  unfollowUsuario,
  getUserDetails,
  agregarPerfilMusical,
  marcarNotificacionLeida,
  resetContrasena
  agregarPerfilMusical,
} = require("./handlers/usuarios");

const {
  crearEvento,
  getEventos,
  likeEvento,
  unlikeEvento,
  deleteEvento,
  editEvento,
}= require("./handlers/eventos");

const{

  crearMensaje,
  getMensajes
}= require("./handlers/mensajes");

const {
  crearGrupo
} = require("./handlers/grupos");


const FBAuthUsuarios = require("./utilidades/fbauthUsuarios");
const FBAuthArtistas = require("./utilidades/fbauthArtistas");
const { admin } = require("./utilidades/administrador");
const {db}=require('./utilidades/administrador');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

//funciones trasladada a publicaciones.js
//funciones publicaciones

app.get("/getUsuarios", getUsuarios);
app.post("/publicaciones", postUsuario);
app.get("/getPublicaciones", getPublicaciones);
app.post("/crearPublicacion", FBAuthUsuarios, crearPublicacion);
app.get("/publicaciones/:postId", getPublicacion);
app.delete("/publicaciones/:postId", FBAuthUsuarios, deletePublicacion);
app.get("/publicaciones/:postId/like", FBAuthUsuarios, likePublicacion);
app.get("/publicaciones/:postId/unlike", FBAuthUsuarios, unlikePublicacion);
app.post("/publicaciones/:postId/comentar", FBAuthUsuarios, comentarPublicacion);
app.post("/editPublicacion/:postId", FBAuthUsuarios, editPublicacion);

// Eventos
app.post("/crearEvento", FBAuthUsuarios,crearEvento);
app.post("/editEvento/:postId", FBAuthUsuarios, editEvento);
app.get("/getEventos",getEventos);
app.get("/Eventos/:postId/like", FBAuthUsuarios, likeEvento);
app.get("/Eventos/:postId/unlike", FBAuthUsuarios, unlikeEvento);
app.delete("/Eventos/:postId", FBAuthUsuarios, deleteEvento);

//Grupos
app.post("/crearGrupo", FBAuthUsuarios, crearGrupo);

// Mensajes 
app.post("/crearMensaje", FBAuthUsuarios, crearMensaje);
app.post("/Mensajes", FBAuthUsuarios, getMensajes);
//funciones trasladadas a usuarios.js
//funciones users

app.post("/signupUsuario", signupUsuario);
app.post("/loginUsuario", loginUsuario);
app.post("/loginArtista", loginArtista);
app.post("/signupArtista", signupArtista);
app.post("/ObtenerUsername", ObtenerUserName);
app.post("/resetContrasena", resetContrasena);
app.post("/usuario/FotoPerfil", FBAuthUsuarios, subirFotoPerfilUsuario);
app.post("/artista/FotoPerfil", FBAuthArtistas, subirFotoPerfilArtista);
app.post("/usuarioDetails", FBAuthUsuarios, addUserDetails);
app.get("/Usuario", FBAuthUsuarios, getUsuarioAutenticado);
app.get("/usuario/:username", getUserDetails);
app.get("/usuario/:username/follow", FBAuthUsuarios, followUsuario);
app.get("/usuario/:username/unfollow", FBAuthUsuarios, unfollowUsuario);
app.post("/Notificaciones", FBAuthUsuarios,marcarNotificacionLeida);

exports.api = functions.https.onRequest(app);
/*
Función: CreateNotifcacionOnLike
Descripción: Crea una notificación al usuario de una publicación en el momento que se le de like 
a su publicación.
Datos de entrada:  snapshot 
Datos de salida: Un doc en la colección de "Notificaciones" 
*/
exports.createNotificacionOnLike=functions.region('us-central1').firestore.document('Likes/{id}')
  .onCreate((snapshot)=>{
    db.doc(`/Publicaciones/${snapshot.data().postId}`).get()
    .then(doc => {
      if(doc.exists){
        return db.doc(`/Notificaciones/${snapshot.id}`).set({
          createdAt: new Date().toISOString(),
          destinatario: doc.data().postedBy,
          remitente: snapshot.data().username,
          type: 'like',
          read: false,
          postId: doc.id

        });
      }
    })
    .then(()=> {
      return;
    })
    .catch((err) =>{
      console.error(err);
      return; 
    });
  });

  /*
Función: eliminarNotifcacionOnUnLike
Descripción: elimina  una notificación al usuario de una publicación en el momento que se
quita un like a su publicación.
Datos de entrada:  snapshot 
Datos de salida: nada
*/
exports.eliminarNotificacionOnUnLike= functions.region('us-central1').firestore.document('Likes/{id}')
.onDelete((snapshot)=>{
  db.doc(`/Notificaciones/${snapshot.id}`)
  .delete()
  .then(()=> {
    return;
  })
  .catch(err => {
    console.error(err);
    return;
  });
});
/*
Función: CreateNotifcacionOnComentario
Descripción: Crea una notificación al usuario de una publicación en el momento que otro usuario haga un comentario 
a su publicación.
Datos de entrada:  snapshot 
Datos de salida: Un doc en la colección de "Notificaciones" 
*/
exports.createNotificacionOnComentario= functions.region('us-central1').firestore.document('Comentarios/{id}')
.onCreate((snapshot)=>{
  db.doc(`/Publicaciones/${snapshot.data().postId}`).get()
  .then(doc => {
    if(doc.exists){
      return db.doc(`/Notificaciones/${snapshot.id}`).set({
        createdAt: new Date().toISOString(),
        destinatario: doc.data().postedBy,
        remitente: snapshot.data().username,
        type: 'Comentario',
        read: false,
        postId: doc.id
      });
    }
  })
  .then(()=> {
    return;
  })
  .catch((err) =>{
    console.error(err);
    return; 
  });
});