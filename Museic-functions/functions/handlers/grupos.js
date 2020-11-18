const { db, admin } = require("../utilidades/administrador");
const config = require("../utilidades/configuracion");

exports.crearGrupo = (req, res) => {
    if (req.body.name.trim() === "") {
      return res
        .status(400)
        .jsn({ postBody: "El nombre del grupo no debe estar vacio" });
    }
    const imagenInicial = "foto_perfil_basica.jpg";

    const newGrupo = {
      name: req.body.name,
      owner: req.user.username,
      bio: req.body.bio,
      generos: req.body.generos,
      Fotolink: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imagenInicial}?alt=media`,
      creado: new Date().toISOString(),
      numIntegrantes: 1,
    };
    admin
        .firestore()
        .collection("Pertenece")
        .add({
            grupo: newGrupo.name,
            username: req.user.username
        })
        .catch((err) => {
            res.status(500).json({ error: "error al crear el grupo" });
            console.log(err);
        });
    admin
      .firestore()
      .collection("Grupos")
      .add(newGrupo)
      .then((doc) => {
        const resGrupo = newGrupo;
        resGrupo.grupoId = doc.id;
  
        res.json(resGrupo);
      })
      .catch((err) => {
        res.status(500).json({ error: "error al crear el grupo" });
        console.error(err);
      });
  };