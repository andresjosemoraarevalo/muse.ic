const { db, admin } = require("../utilidades/administrador");

//get mensajes 
exports.getMensajes = (req, res) => {
    let mensajes = [];
    db.collection("Mensajes")
  .where("postedBy","==",req.user.username)
  .where("postedFor","==",req.body.chat)
  .get()
  .then((data) => { 
    data.forEach((doc) => {
        
      mensajes.push(doc.data());
    });
    return db.collection("Mensajes")
    .where("postedFor","==",req.user.username)
    .where("postedBy","==",req.body.chat)
    .get()
  })
  .then ((data)=> {
    data.forEach((doc)=> {
        
        mensajes.push(
            doc.data()
        );
    });
    return res.json(mensajes);
  })
  
  .catch((err) => console.error(err));
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