const functions = require('firebase-functions');
const admin= require('firebase-admin');

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const express = require('express');
const app = express();

/*
 getUsuarios:
 Parametros: No
 Salidas: archivo .json con los usuarios de la base de datos
 Descripción: Esta función retorna en un archivo los datos de la colección "Usuarios" 
  */
 app.get('/Usuarios', (request, response) => {
  admin
  .firestore()
  .collection("Usuarios")
  .get()
  .then((data) => {
      let usuarios = [];
      data.forEach((doc) => {
        usuarios.push(doc.data());
      });
      return response.json(usuarios);
    })
    .catch(err => console.error(err));
 });

 /*
CreateUsuario:
Parametros: (Post) un archivo JSON con los datos del nuevo usuario 
Salidas: un request
Descripción: Esta función crea un usuario a partir de los datos recibidos en el .json 
y lo guarda en la base de datos en la colección correspondiente 
 */
 app.post('/Usuario', (request, response) => {
      
  const newUsuario = {
      username: request.body.username,
      Fotolink: request.body.Fotolink,
      Nombre: request.body.Nombre,
      interesesMusicales: request.body.interesesMusicales, // Aún no guarda la lista
      FechaNacimiento: request.body.FechaNacimiento, // Aún no guarda la fecha de nacimiento 
      contraseña: request.body.contraseña      
    };
    admin
      .firestore()
      .collection('Usuarios')
      .add(newUsuario)
      .then((doc) => {
          response.json({ message: 'document ${doc.id} creado exitosamente'});
      })
      .catch((err) => {
          response.status(500).json({ error: 'algo salió mal'});
          console.error(err);
      })
 });

 // https://baseurl.com/api/
exports.api = functions.https.onRequest(app);