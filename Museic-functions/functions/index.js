const functions = require('firebase-functions');
const admin= require('firebase-admin');

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
   
   response.send("Hello from Firebase wow!");
 });


 exports.getUsuarios= functions.https.onRequest((request, response) => {

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

 exports.createUsuario= functions.https.onRequest((request, response) => {
    const newUsuario = {
      body: request.body.body,
      userHandle: request.body.userHandle,
      createAt: admin.firestore.Timestamp.fromDate(new Date())

    };
    admin
      .firestore()
      .collection('usuarios')
      .add(newUsuario)
      .then((doc) => {
          res.json({ message: 'document ${doc.id} creado exitosamente'});
      })
      .catch((err) => {
          res.status(500).json({ error: 'algo salió mal'});
          console.error(err);
      })
 });

