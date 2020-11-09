const { db, admin } = require("../utilidades/administrador");

//get una publicacion
exports.getMensajes = (req, res) => {
    let publicacionData = {};
    db.doc(`/Mensajes/${req.params.postId}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ error: "Mensaje no encontrada" });
        }
        publicacionData = doc.data();
        publicacionData.postId = doc.id;
        return res.json(publicacionData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
  };


  exports.crearMensaje = (req, res) => {
    if (req.body.postBody.trim() === "") {
      return res
        .status(400)
        .jsn({ postBody: "El mensaje no puede estar vacio" });
    }
    const newEvento = {
      postBody: req.body.postBody,
      postedBy: req.user.username,
      postedFor: req.body.username2,
      Fotolink: req.user.Fotolink,
      postDate: new Date().toISOString(),
    };
  
    admin
      .firestore()
      .collection("Mensajes")
      .add(newEvento)
      .then((doc) => {
        const resEvento= newEvento;
        resEvento.postId = doc.id;
  
        res.json(resEvento);
      })
      .catch((err) => {
        res.status(500).json({ error: "error al crear el mensaje" });
        console.error(err);
      });
  };