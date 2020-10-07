const { admin, db } = require("../utilidades/administrador");

const config = require("../utilidades/configuracion");

const firebase = require("firebase");

firebase.initializeApp(config);

const { json } = require("express");

const FBauthUsuarios = require("../utilidades/fbauthUsuarios");

const {
  validarDatosdeSignup,
  validarDatosdeLogin,
  reduceUserDetails
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
  };

  const { valido, errors } = validarDatosdeSignup(newUsuario);

  if (!valido) return response.status(400).json(errors);

  const imagenInicial = 'foto_perfil_basica.jpg';

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
  };

  const { valido, errors } = validarDatosdeSignup(newArtista);

  if (!valido) return response.status(400).json(errors);

  const imagenInicial = 'foto_perfil_basica.jpg';

  let token, userId;
  db.doc(`/Artistas/${newArtista.username}`)
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
      };
      return db.doc(`/Artistas/${newArtista.username}`).set(userCredentials);
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
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
/*
subirFotoPerfilUsuario
parametros: imagen png o jpeg a cambiar.
salida: json con estado de aceptación o error
*/
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
exports.subirFotoPerfilUsuario = (request, response) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: request.headers });

  let nombreArchivoImagen;
  let imagenACargar = {};

  busboy.on('file',(nombreCampo, archivo, nombreArchivo, codificación, mimetype) => {
      console.log(nombreCampo);
      console.log(nombreArchivo);
      console.log(mimetype);
      if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
        return response
          .status(400)
          .json({ error: "Archivo con formato incorrecto cargado" });
      }
      const extensionImagen = nombreArchivo.split(".")[nombreArchivo.split(".").length - 1];
      nombreArchivoImagen = `${Math.round( Math.random() * 10000000000000 )}.${extensionImagen}`;
      const direccionArchivo = path.join(os.tmpdir(), nombreArchivoImagen);
      imagenACargar = { direccionArchivo, mimetype };

      archivo.pipe(fs.createWriteStream(direccionArchivo));
    }
  );
  busboy.on('finish', () => {
    admin.storage().bucket().upload(imagenACargar.direccionArchivo, {
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
          .doc(`/Usuarios/${request.user.username}`)
          .update({ Fotolink : urlImagen});
      })
      .then(() => {
        return response.json({ message: 'Imagen cargada correctamente' });
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  });
  busboy.end(request.rawBody);
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

  busboy.on('file',(nombreCampo, archivo, nombreArchivo, codificación, mimetype) => {
      console.log(nombreCampo);
      console.log(nombreArchivo);
      console.log(mimetype);
      if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
        return response
          .status(400)
          .json({ error: "Archivo con formato incorrecto cargado" });
      }
      const extensionImagen = nombreArchivo.split(".")[nombreArchivo.split(".").length - 1];
      nombreArchivoImagen = `${Math.round( Math.random() * 10000000000000 )}.${extensionImagen}`;
      const direccionArchivo = path.join(os.tmpdir(), nombreArchivoImagen);
      imagenACargar = { direccionArchivo, mimetype };

      archivo.pipe(fs.createWriteStream(direccionArchivo));
    }
  );
  busboy.on('finish', () => {
    admin.storage().bucket().upload(imagenACargar.direccionArchivo, {
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
          .update({ Fotolink : urlImagen});
      })
      .then(() => {
        return response.json({ message: 'Imagen cargada correctamente' });
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
  let userDetails = reduceUserDetails(req.body);

  db.doc(`/Usuarios/${req.user.username}`).update(userDetails)
    .then(() => {
      return res.json({ message: 'Detalles añadidos satisfactoriamente'});
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({error: err.code});
    });
};

//getUsuarioAutenticado
exports.getUsuarioAutenticado = (req, res) => {
  let userData = {};
  db.doc(`/Usuarios/${req.user.username}`).get()
    .then(doc => {
      if(doc.exists){
        userData.credentials = doc.data();
        return db.collection('seguidos').where('username', '==', req.user.username).get()
      }
    })
    .then(data => {
      userData.seguidos = [];
      data.forEach(doc => {
        userData.seguidos.push(doc.data());
      }); 
      return res.json(userData);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    })
}