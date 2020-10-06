const { db } = require("../utilidades/administrador");

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
