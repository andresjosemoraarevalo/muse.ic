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
