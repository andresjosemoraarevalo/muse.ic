const { db, admin } = require("../utilidades/administrador");



// obtener eventos 
exports.getEventos = (req, res) => {
    db.collection("Eventos")
      .orderBy("postDate", "desc")
      .get()
      .then((data) => {
        let eventos = [];
        data.forEach((doc) => {
          eventos.push({
            postId: doc.id,
            postBody: doc.data().postBody,
            postedBy: doc.data().postedBy,
            postDate: doc.data().postDate,
            comentarios: doc.data().comentarios,
            likes: doc.data().likes,
            Fotolink: doc.data().Fotolink,
            nombre: doc.data().nombre,
            precio: doc.data().precio,
            fechaEvento: doc.data().fechaEvento,
            horaEvento: doc.data().horaEvento,
            precio: doc.data().precio,
            lugar: doc.data().lugar,
            generos: doc.data().generos,
          });
        });
        return res.json(eventos);
      })
      .catch((err) => console.error(err));
  };
  
  // Hacer un evento 
  exports.crearEvento = (req, res)=>{
    if (req.body.postBody.trim() === "") {
      return res
        .status(400)
        .jsn({ postBody: "El evento no debe estar vacia" });
    }
    const newEvento = {
      postBody: req.body.postBody,
      postedBy: req.user.username,
      Fotolink: req.user.Fotolink,
      postDate: new Date().toISOString(),
      lugar: req.body.lugar,
      fechaEvento: req.body.fecha,
      nombre: req.body.nombre,
      precio: req.body.precio,
      generos: req.body.generos,
      likes: 0,
      comentarios: 0,
    };
    admin
    .firestore()
    .collection("Eventos")
    .add(newEvento)
    .then((doc) => {
      const resEvento = newEvento;
      resEvento.postId = doc.id;
      res.json(resEvento);
    })
    .catch((err) => {
      res.status(500).json({ error: "error al crear el evento" });
      console.error(err);
    });
  
  };


  //dar like a un evento
exports.likeEvento = (req, res) => {
    const likeDocument = db
      .collection("LikesE")
      .where("username", "==", req.user.username)
      .where("postId", "==", req.params.postId)
      .limit(1);
  
    const postDocument = db.doc(`/Eventos/${req.params.postId}`);
  
    let postData;
  
    postDocument
      .get()
      .then((doc) => {
        if (doc.exists) {
          postData = doc.data();
          postData.postId = doc.id;
          return likeDocument.get();
        } else {
          return res.status(404).json({ error: "Evento no encontrada" });
        }
      })
      .then((data) => {
        if (data.empty) {
          return db
            .collection("LikesEventos")
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
            .json({ error: "Ya le diste like a este evento" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
  };
  
  //unlike una publicacion
  exports.unlikeEvento = (req, res) => {
    const likeDocument = db
      .collection("LikesEventos")
      .where("username", "==", req.user.username)
      .where("postId", "==", req.params.postId)
      .limit(1);
  
    const postDocument = db.doc(`/Eventos/${req.params.postId}`);
  
    let postData;
  
    postDocument
      .get()
      .then((doc) => {
        if (doc.exists) {
          postData = doc.data();
          postData.postId = doc.id;
          return likeDocument.get();
        } else {
          return res.status(404).json({ error: "Evento no encontrada" });
        }
      })
      .then((data) => {
        if (data.empty) {
          return res
            .status(400)
            .json({ errror: "Evento sin like" });
          
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

  exports.deleteEvento = (req, res) => {
  const document = db.doc(`/Eventos/${req.params.postId}`);
  document.get()
    .then(doc => {
      if(!doc.exists){
        return res.status(404).json({ error: 'Evento no encontrada' });
      }
      if(doc.data().postedBy !== req.user.username){
        return res.status(403).json({ error: 'Sin autorizacion' });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: 'Evento eliminado' });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    })
};
exports.editEvento = (req, res) => {
  let postDetails = req.body;
  db.doc(`/Eventos/${req.params.postId}`)
    .update(postDetails)
    .then(() => {
      return res.json({ message: "Detalles de post añadidos satisfactoriamente" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    }); 
}