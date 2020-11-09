const { db, admin } = require("../utilidades/administrador");

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

/*
 getUsuarios:
 Parametros: No
 Salidas: archivo .json con los usuarios de la base de datos
 Descripción: Esta función retorna en un archivo los datos de la colección "Usuarios" 
*/

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
exports.getUsuarios = (request, response) => {
  db.collection("Usuarios")
    .orderBy("username", "desc")
    .get()
    .then((data) => {
      let usuarios = [];
      data.forEach((doc) => {
        usuarios.push({
          usuarioId: doc.id,
          username: doc.data().username,
          Nombre: doc.data().Nombre,
          FechaNacimiento: doc.data().FechaNacimiento,
          contraseña: doc.data().contraseña,
          interesesMusicales: doc.data().interesesMusicales,
          Fotolink: doc.data().Fotolink,
          email: doc.data().email,
          artista: doc.data().artista,
        });
      });
      return response.json(usuarios);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

/*
Usuario:
Parametros: (Post) un archivo JSON con los datos del nuevo usuario 
Salidas: un request
Descripción: Esta función crea un usuario a partir de los datos recibidos en el .json 
y lo guarda en la base de datos en la colección correspondiente 
*/

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
exports.postUsuario = (request, response) => {
  const newUsuario = {
    username: request.body.username,
    Fotolink: request.body.Fotolink,
    Nombre: request.body.Nombre,
    interesesMusicales: request.body.interesesMusicales, // Aún no guarda la lista
    FechaNacimiento: request.body.FechaNacimiento, // Aún no guarda la fecha de nacimiento
    contraseña: request.body.contraseña,
  };
  db.collection("Usuarios")
    .add(newUsuario)
    .then((doc) => {
      response.json({ message: "document ${doc.id} creado exitosamente" });
    })
    .catch((err) => {
      response.status(500).json({ error: "algo salió mal" });
      console.error(err);
    });
};
// obtener publicaciones 
exports.getPublicaciones = (req, res) => {
  db.collection("Publicaciones")
    .orderBy("postDate", "desc")
    .get()
    .then((data) => {
      let publicaciones = [];
      data.forEach((doc) => {
        publicaciones.push({
          postId: doc.id,
          postBody: doc.data().postBody,
          postedBy: doc.data().postedBy,
          postDate: doc.data().postDate,
          comentarios: doc.data().comentarios,
          likes: doc.data().likes,
          Fotolink: doc.data().Fotolink,
          nombre: doc.data().nombre
        });
      });
      return res.json(publicaciones);
    })
    .catch((err) => console.error(err));
};
//hacer una publicacion
exports.crearPublicacion = (req, res) => {
  if (req.body.postBody.trim() === "") {
    return res
      .status(400)
      .jsn({ postBody: "La publicacion no debe estar vacia" });
  }
  const newPublicacion = {
    postBody: req.body.postBody,
    postedBy: req.user.username,
    Fotolink: req.user.Fotolink,
    postDate: new Date().toISOString(),
    likes: 0,
    comentarios: 0,
  };

  admin
    .firestore()
    .collection("Publicaciones")
    .add(newPublicacion)
    .then((doc) => {
      const resPublicacion = newPublicacion;
      resPublicacion.postId = doc.id;

      res.json(resPublicacion);
    })
    .catch((err) => {
      res.status(500).json({ error: "error al crear publicación" });
      console.error(err);
    });
};
//get una publicacion
exports.getPublicacion = (req, res) => {
  let publicacionData = {};
  db.doc(`/Publicaciones/${req.params.postId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Publicacion no encontrada" });
      }
      publicacionData = doc.data();
      publicacionData.postId = doc.id;
      return db
        .collection("Comentarios")
        .orderBy("postDate", "desc")
        .where("postId", "==", req.params.postId)
        .get();
    })
    .then((data) => {
      publicacionData.comentarios = [];
      data.forEach((doc) => {
        publicacionData.comentarios.push(doc.data());
      });
      return res.json(publicacionData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
//comentar en una publicacion
exports.comentarPublicacion = (req, res) => {
  if (req.body.body.trim() === "")
    return res.status(400).json({ error: "El comentario no debe estar vacio" });

  const newComentario = {
    body: req.body.body,
    postDate: new Date().toISOString(),
    postId: req.params.postId,
    username: req.user.username,
    nombre: req.user.nombre,
    Fotolink: req.user.Fotolink,
  };
  db.doc(`/Publicaciones/${req.params.postId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Publicacion no encontrada " });
      }
      return doc.ref.update({ comentarios: doc.data().comentarios + 1 });
    })
    .then(() => {
      return db.collection('Comentarios').add(newComentario);
    })
    .then(() => {
      res.json(newComentario);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Algo salio mal :(" });
    });
};

//dar like a publicacion
exports.likePublicacion = (req, res) => {
  const likeDocument = db
    .collection("Likes")
    .where("username", "==", req.user.username)
    .where("postId", "==", req.params.postId)
    .limit(1);

  const postDocument = db.doc(`/Publicaciones/${req.params.postId}`);

  let postData;

  postDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Publicacion no encontrada" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("Likes")
          .add({
            postId: req.params.postId,
            username: req.user.username,
          })
          .then(() => {
            postData.likes++;
            return postDocument.update({ likes: postData.likes });
          })
          .then(() => {
            return res.json(postData);
          });
      } else {
        return res
          .status(400)
          .json({ error: "Ya le diste like a esta publicacion" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//unlike una publicacion
exports.unlikePublicacion = (req, res) => {
  const likeDocument = db
    .collection("Likes")
    .where("username", "==", req.user.username)
    .where("postId", "==", req.params.postId)
    .limit(1);

  const postDocument = db.doc(`/Publicaciones/${req.params.postId}`);

  let postData;

  postDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Publicacion no encontrada" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res
          .status(400)
          .json({ errror: "Publicacion sin like" });
        
      } else {
        return db
          .doc(`/Likes/${data.docs[0].id}`).delete()
          .then(() => {
            postData.likes--;
            return postDocument.update({ likes: postData.likes });
          })
          .then(() => {
            res.json(postData);

          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//borrar publicacion
exports.deletePublicacion = (req, res) => {
  const document = db.doc(`/Publicaciones/${req.params.postId}`);
  document.get()
    .then(doc => {
      if(!doc.exists){
        return res.status(404).json({ error: 'Publicacion no encontrada' });
      }
      if(doc.data().postedBy !== req.user.username){
        return res.status(403).json({ error: 'Sin autorizacion' });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: 'Publicacion eliminada' });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    })
};