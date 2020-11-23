const { admin, db } = require("../utilidades/administrador");

const config = require("../utilidades/configuracion");

const firebase = require("firebase");

firebase.initializeApp(config);

const { json } = require("express");

const FBauthUsuarios = require("../utilidades/fbauthUsuarios");

const {
  validarDatosdeSignup,
  validarDatosdeLogin,
  reduceUserDetails,
  soloDetails,
} = require("../utilidades/validadores");

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
/*
signupUsario
parametros: un documento json con la estructura de crear usuario:
  - correo electronico
  - contraseña 
  - confirmación de contraseña 
  - nombre de usuario
salida: mensaje .json del resultado del procedimiento respecto a las entradas 
        y los datos de la base de datos.
*/
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

exports.signupUsuario = (request, response) => {
  const newUsuario = {
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    username: request.body.username,
    seguidores: 0,
    seguidos: 0,
    artista: false
  };

  const { valido, errors } = validarDatosdeSignup(newUsuario);

  if (!valido) return response.status(400).json(errors);

  const imagenInicial = "foto_perfil_basica.jpg";

  let token, userId;
  db.doc(`/Usuarios/${newUsuario.username}`)
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
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        username: newUsuario.username,
        email: newUsuario.email,
        Fotolink: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imagenInicial}?alt=media`,
        userId,
        seguidores: newUsuario.seguidores,
        seguidos: newUsuario.seguidos,
        artista: newUsuario.artista,
        numPerfilMusical:0,
        perfilMusical:{
          "Rock Alternativo": [0,0] ,
          "Ambiente": [0,0],
          "Clasica": [0,0], 
          "Country": [0,0],
          "Cumbia": [0,0],
          "Dance": [0,0],
          "EDM": [0,0], 
          "Dancehall": [0,0],
          "Deep House": [0,0],
          "Disco": [0,0], 
          "Drum & Bass": [0,0],
          "Dubstep": [0,0],
          "Electrónica": [0,0], 
          "Folk": [0,0],
          "Hip Hop y Rap": [0,0],
          "House": [0,0],
          "Indie": [0,0],
          "Jazz y Blues": [0,0],
          "Latina": [0,0],
          "Metal": [0,0],
          "Piano": [0,0],
          "Pop": [0,0],
          "R&B y Soul": [0,0],
          "Reggae": [0,0], 
          "Reguetón": [0,0],
          "Rock": [0,0],
          "Bandas Sonoras": [0,0],
          "Techno": [0,0],
          "Trance": [0,0],
          "Trap": [0,0],
          "Triphop": [0,0],
          "Vallenato": [0,0]}
    
        
      };
      return db.doc(`/Usuarios/${newUsuario.username}`).set(userCredentials);
    })
    .then(() => {
      return response.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code == "auth/email-already-in-use") {
        return response.status(400).json({ email: "Email a está en uso" });
      } else if (err.code == "auth/weak-password") {
        return response
          .status(400)
          .json({ password: "contraseña demasiado debil" });
      } else {
        return response.status(500).json({ error: err.code });
      }
    });
};
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
/*
signupArtista
parametros: un documento json con la estructura de crear Artista:
  - correo electronico
  - contraseña 
  - confirmación de contraseña 
  - nombre de usuario
salida: mensaje .json del resultado del procedimiento respecto a las entradas 
        y los datos de la  base de datos.
*/
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
exports.signupArtista = (request, response) => {
  const newArtista = {
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    username: request.body.username,
    seguidores: 0,
    seguidos: 0,
    artista: true
  };

  const { valido, errors } = validarDatosdeSignup(newArtista);

  if (!valido) return response.status(400).json(errors);

  const imagenInicial = "foto_perfil_basica.jpg";

  let token, userId;
  db.doc(`/Usuarios/${newArtista.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return response
          .status(400)
          .json({ username: "Este nombre de artista ya está en uso" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(
            newArtista.email,
            newArtista.password
          );
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        username: newArtista.username,
        email: newArtista.email,
        Fotolink: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imagenInicial}?alt=media`,
        userId,
        seguidores: newArtista.seguidores,
        seguidos: newArtista.seguidos,
        artista: newArtista.artista,
        numPerfilMusical:0,
        perfilMusical:{
          "Rock Alternativo": [0,0],
          "Ambiente": [0,0],
          "Clasica": [0,0], 
          "Country": [0,0],
          "Cumbia": [0,0],
          "Dance": [0,0],
          "EDM": [0,0], 
          "Dancehall": [0,0],
          "Deep House": [0,0],
          "Disco": [0,0], 
          "Drum & Bass": [0,0],
          "Dubstep": [0,0],
          "Electrónica": [0,0], 
          "Folk": [0,0],
          "Hip Hop y Rap": [0,0],
          "House": [0,0],
          "Indie": [0,0],
          "Jazz y Blues": [0,0],
          "Latina": [0,0],
          "Metal": [0,0],
          "Piano": [0,0],
          "Pop": [0,0],
          "R&B y Soul": [0,0],
          "Reggae": [0,0], 
          "Reguetón": [0,0],
          "Rock": [0,0],
          "Bandas Sonoras": [0,0],
          "Techno": [0,0],
          "Trance": [0,0],
          "Trap": [0,0],
          "Triphop": [0,0],
          "Vallenato": [0,0]
    
        }
      
      };
      return db.doc(`/Usuarios/${newArtista.username}`).set(userCredentials);
    })
    .then(() => {
      return response.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code == "auth/email-already-in-use") {
        return response.status(400).json({ email: "Email a está en uso" });
      } else if (err.code == "auth/weak-password") {
        return response
          .status(400)
          .json({ password: "contraseña demasiado debil" });
      } else {
        return response.status(500).json({ error: err.code });
      }
    });
};
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
/*
loginUsuario (para artista también)
parametros: un archivo .json con los siguientes atributos:
    - email: correo electronico con el que se registra 
    - contraseña: la contraseña asociada 
salida: .json con resultado del procedimiento respecto a las entradas y los 
        datos de la base de datos
*/
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
exports.loginUsuario = (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password,
  };

  const { valido, errors } = validarDatosdeLogin(user);

  if (!valido) return response.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return response.json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code == "auth/wrong-password") {
        return response
          .status(403)
          .json({ general: "Datos incorrectos, por favor intente nuevamente" });
      } else if (err.code == "auth/user-not-found") {
        return response
          .status(403)
          .json({ general: "Datos incorrectos, por favor intente nuevamente" });
      } else {
        return response.status(500).json({ error: err.code });
      }
    });
};

exports.ObtenerUserName= (request, response) =>{
  var userData = {};
  db.collection("Artistas")
    .where("email", "==", request.body.email)
    .get()
    .then((data)=>{
          data.forEach((doc) => {
            userData.username =doc.data().username;
          });
          return response.json(userData);
    });

}

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

exports.resetContrasena = (req, res) => {
  const user = {
    email: req.body.email
  }
  if(!isEmail(user.email)) return res.status(400).json({ error: 'Email invalido' });
  firebase 
    .auth()
    .sendPasswordResetEmail(user.email)
    .then(() => {
      return res.json({ email: "Se mandó el correo de cambio de contraseña" });
    })
    .catch((err) => {
      return res.status(400).json({ error: "Usuario no encontrado" });
    })

}

exports.loginArtista = (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password,
  };
  const { valido, errors } = validarDatosdeLogin(user);
  if (!valido) return response.status(400).json(errors);
  
  
  firebase
  .auth()
  .signInWithEmailAndPassword(user.email, user.password)
  .then((data) => {
    return data.user.getIdToken();
  })
  .then((token) => {
    return response.json({ token });
  })
  .catch((err) => {
    console.error(err);
    if (err.code == "auth/wrong-password") {
      return response
        .status(403)
        .json({ general: "Datos incorrectos, por favor intente nuevamente" });
    } else if (err.code == "auth/user-not-found") {
      return response
        .status(403)
        .json({ general: "Datos incorrectos, por favor intente nuevamente" });
    } else {
      return response.status(500).json({ error: err.code });
    }
  });

};
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
/*
subirFotoPerfilUsuario
parametros: imagen png o jpeg a cambiar.
salida: json con estado de aceptación o error
*/
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
exports.subirFotoPerfilUsuario = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });

  let imageToBeUploaded = {};
  let imageFileName;
  // String for image token
  

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log(fieldname, file, filename, encoding, mimetype);
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    // 32756238461724837.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
            //Generate token to be appended to imageUrl
          },
        },
      })
      .then(() => {
        // Append token to url
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/Usuarios/${req.user.username}`).update({ Fotolink: imageUrl });
      })
      .then(() => {
        return res.json({ message: "image uploaded successfully" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: "something went wrong" });
      });
  });
  busboy.end(req.rawBody);
};
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
/*
subirFotoPerfilArtista
parametros: imagen png o jpeg a cambiar.
salida: json con estado de aceptación o error
*/
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
exports.subirFotoPerfilArtista = (request, response) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: request.headers });

  let nombreArchivoImagen;
  let imagenACargar = {};

  busboy.on(
    "file",
    (nombreCampo, archivo, nombreArchivo, codificación, mimetype) => {
      console.log(nombreCampo);
      console.log(nombreArchivo);
      console.log(mimetype);
      if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
        return response
          .status(400)
          .json({ error: "Archivo con formato incorrecto cargado" });
      }
      const extensionImagen = nombreArchivo.split(".")[
        nombreArchivo.split(".").length - 1
      ];
      nombreArchivoImagen = `${Math.round(
        Math.random() * 10000000000000
      )}.${extensionImagen}`;
      const direccionArchivo = path.join(os.tmpdir(), nombreArchivoImagen);
      imagenACargar = { direccionArchivo, mimetype };

      archivo.pipe(fs.createWriteStream(direccionArchivo));
    }
  );
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imagenACargar.direccionArchivo, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imagenACargar.mimetype,
          },
        },
      })
      .then(() => {
        const urlImagen = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${nombreArchivoImagen}?alt=media`;
        console.log(urlImagen);
        return db
          .doc(`/Artistas/${request.user.username}`)
          .update({ Fotolink: urlImagen });
      })
      .then(() => {
        return response.json({ message: "Imagen cargada correctamente" });
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  });
  busboy.end(request.rawBody);
};

//addUserDetails
exports.addUserDetails = (req, res) => {
  let userDetails = soloDetails(req.body);

  db.doc(`/Usuarios/${req.user.username}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: "Detalles añadidos satisfactoriamente" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
//get detalles de cualquier usuario
exports.getUserDetails = (req, res) => {
  let userData = {};
  db.doc(`/Usuarios/${req.params.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.user = doc.data();
        return db
          .collection("Publicaciones")
          .where("postedBy", "==", req.params.username)
          .orderBy("postDate", "desc")
          .get();
      } else {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
    })
    .then((data) => {
      userData.publicaciones = [];
      data.forEach((doc) => {
        userData.publicaciones.push({
          postedBy: doc.data().postedBy,
          postBody: doc.data().postBody,
          postDate: doc.data().postDate,
          username: doc.data().username,
          Fotolink: doc.data().Fotolink,
          generos: doc.data().generos,
          nombre: doc.data().nombre,
          likes: doc.data().likes,
          dislikes: doc.data().dislikes,
          comentarios: doc.data().comentarios,
          postId: doc.id,
          remix: doc.data().remix,
          remixId: doc.data().remixId,
          remixBody: doc.data().remixBody,
          remixUsername: doc.data().remixUsername
        });
      });
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
//getUsuarioAutenticado
exports.getUsuarioAutenticado = (req, res) => {
  let userData = {};
  db.doc(`/Usuarios/${req.user.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db
          .collection("Likes")
          .where("username", "==", req.user.username)
          .get();
      }
    })
    .then((data) => {
      userData.likes = [];
      data.forEach((doc) => {
        userData.likes.push(doc.data());
      });

      return db
      .collection("LikesEventos")
      .where("username", "==", req.user.username)
      .get();
    })
    .then((data) => {
      userData.likesE = [];
    data.forEach((doc) => {
      userData.likesE.push(doc.data());
    });
      return db
      .collection("Dislikes")
      .where("username", "==", req.user.username)
      .get();
    })
    .then((data) => {
      userData.dislikes = [];
      data.forEach((doc) => {
        userData.dislikes.push(doc.data());
      });
      return db
          .collection("Notificaciones")
          .where('destinatario', "==", req.user.username)
          .orderBy("createdAt","desc")
          
          .get();
      
    })
    .then((data)=> {
      userData.notificaciones = [];
      data.forEach((doc)=> {
        userData.notificaciones.push({
          destinatario: doc.data().destinatario,
          remitente: doc.data().remitente,
          createdAt: doc.data().createdAt,
          postId: doc.data().postId,
          type: doc.data().type,
          read: doc.data().read,
          notificationId: doc.id,
        });
      });
      return db
          .collection("Seguidos")
          .where("username", "==", req.user.username)
          .get();
      
    })
    .then((data) => {
      userData.seguidos = [];
      data.forEach((doc) => {
        userData.seguidos.push(doc.data());
      });
      return db
      .collection("Seguidos")
      .where("follows","==",req.user.username)
      .get();
    })
    .then((data) => {
      userData.seguidores=[];
      data.forEach((doc)=> {
        userData.seguidores.push(doc.data());
      });
      return db
        .collection("Publicaciones")
        .where("postedBy", "==", req.user.username)
        .orderBy("postDate", "desc")
        .get();
    })
    .then((data) => {
      userData.publicaciones = [];
      data.forEach((doc) => {
        userData.publicaciones.push(doc.data());
      });
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

//follow un usuario
exports.followUsuario = (req, res) => {
  const followDocument = db
    .collection("Seguidos")
    .where("username", "==", req.user.username)
    .where("follows", "==", req.params.username)
    .limit(1);

  db.doc(`/Usuarios/${req.user.username}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Usuario no encontrad0 " });
      }
      return doc.ref.update({ seguidos: doc.data().seguidos + 1 });
    });
  
  const userDocument = db.doc(`/Usuarios/${req.params.username}`);

  let userData;

  userDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData = doc.data();
        userData.username = doc.id;
        return followDocument.get();
      } else {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("Seguidos")
          .add({
            follows: req.params.username,
            username: req.user.username,
          })
          .then(() => {
            userData.seguidores++;
            return userDocument.update({ seguidores: userData.seguidores });
          })
          .then(() => {
            return res.json(userData);
          });
      } else {
        return res.status(400).json({ error: "Ya sigues a este usuario" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//unfollow un usuario
exports.unfollowUsuario = (req, res) => {
  const followDocument = db
    .collection("Seguidos")
    .where("username", "==", req.user.username)
    .where("follows", "==", req.params.username)
    .limit(1);

  db.doc(`/Usuarios/${req.user.username}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Usuario no encontrad0 " });
      }
      return doc.ref.update({ seguidos: doc.data().seguidos - 1 });
    });

  const camilix = db.doc(`/Usuarios/${req.params.username}`);

  let userData;

  camilix
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData = doc.data();
        userData.username = doc.id;
        return followDocument.get();
      } else {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res
          .status(400)
          .json({ errror: "No sigues este usuario" });
        
      } else {
        return db
          .doc(`/Seguidos/${data.docs[0].id}`).delete()
          .then(() => {
            userData.seguidores--;
            return camilix.update({ seguidores: userData.seguidores });
          })
          .then(() => {
            res.json(userData);

          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// marcar notificacion leida 

exports.marcarNotificacionLeida =(req, res)=>{
  let batch = db.batch();
  req.body.forEach(notificationId => {
    const notification = db.doc(`/Notificaciones/${notificationId}`);
    batch.update(notification, {read:true});
  });
  batch.commit()
  .then(()=>{
    return res.json({message: 'Notificacion marcada leida'});

  }).catch(err =>{
    console.error(err);
    return res.status(500).json({error: err.code});
  });

}

exports.agregarPerfilMusical =(req, res) =>{
  const imagenInicial = "foto_perfil_basica.jpg";
  let perfilmusical = {
    username: "",
        email: "",
        Fotolink:`https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imagenInicial}?alt=media`,
        userId: null,
        seguidores: 0,
        seguidos: 0,
        artista: false,
    perfilMusical:{
      "Rock Alternativo": [0,0] ,
      "Ambiente": [0,0],
      "Clasica": [0,0], 
      "Country": [0,0],
      "Cumbia": [0,0],
      "Dance": [0,0],
      "EDM": [0,0], 
      "Dancehall": [0,0],
      "Deep House": [0,0],
      "Disco": [0,0], 
      "Drum & Bass": [0,0],
      "Dubstep": [0,0],
      "Electrónica": [0,0], 
      "Folk": [0,0],
      "Hip Hop y Rap": [0,0],
      "House": [0,0],
      "Indie": [0,0],
      "Jazz y Blues": [0,0],
      "Latina": [0,0],
      "Metal": [0,0],
      "Piano": [0,0],
      "Pop": [0,0],
      "R&B y Soul": [0,0],
      "Reggae": [0,0], 
      "Reguetón": [0,0],
      "Rock": [0,0],
      "Bandas Sonoras": [0,0],
      "Techno": [0,0],
      "Trance": [0,0],
      "Trap": [0,0],
      "Triphop": [0,0],
      "Vallenato": [0,0]

    }
  };
  // return db.doc(`/Usuarios/${newUsuario.username}`).set(userCredentials);
  db.collection("Usuarios")
  .get()
  .then((data)=> {
    data.forEach((doc)=>{
      perfilmusical.username= doc.data().username;
      return db.doc(`/Usuarios/${doc.data().username}`).set(perfilmusical);
    })
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({ error: err.code });
  });



}