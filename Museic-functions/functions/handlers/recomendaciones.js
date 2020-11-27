const { db, admin } = require("../utilidades/administrador");
const app = require("express")();
const{
    getUserDetails,
}=require("./usuarios");


function ordenarAsc(p_array_json, p_key) {
    p_array_json.sort(function (a, b) {
       return parseFloat(a.puntuacion) - parseFloat(b.puntuacion);;
    });
  };
  function ordenarDesc(p_array_json, p_key) {
    ordenarAsc(p_array_json, p_key); p_array_json.reverse(); 
  };
exports .actualizarPMgustosPerfil= (req) =>{
    let userData = {};   
    db.doc(`/Usuarios/${req.user.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.user = doc.data();
        }
        userData.user.numPerfilMusical++;
        for (const genero in userData.user.perfilMusical ){
            for (const generito in userData.user.gustos){
                if(genero === userData.user.gustos[generito]){
                    userData.user.perfilMusical[genero][0]+=10;
                }
                userData.user.perfilMusical[genero][1]=(userData.user.perfilMusical[genero][0])/userData.user.numPerfilMusical;
            }      
            sumatoria+=userData.user.perfilMusical[genero][1];
        };
        for (const genero in userData.user.perfilMusical ){  
                if(userData.user.perfilMusical[genero][1] != 0){
                    userData.user.perfilMusical[genero][1]/=sumatoria; 
                }        
        };    
        let userDetails={};
        userDetails.numPerfilMusical=userData.user.numPerfilMusical;
        userDetails.perfilMusical=userData.user.perfilMusical;
        db.doc(`/Usuarios/${req.user.username}`)
        .update(userDetails)
        .then(() => {
            return true;
        })
        .catch((err) => {
            console.error(err);
            return false;
        });
            
    })
    .catch((err) => {
        console.error(err);
        return false;
      });
    

}

exports.actualizarPMLikePublicacion= (req) => {
    let postData={};
    let userData = {};   
  db.doc(`/Usuarios/${req.user.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.user = doc.data();
        }
        return db
        .doc(`/Publicaciones/${req.params.postId}`)
        .get()     
    })
    .then((doc) => {      
        if(doc.exists) {
           postData.post=doc.data();    
        }
        let generitos =[];
        let mapa=userData.user.perfilMusical;
        generitos=postData.post.generos;
        mapa=userData.user.perfilMusical;
        let sumatoria=0;
        userData.user.numPerfilMusical++;
        for (const genero in userData.user.perfilMusical ){
            for (const generito in postData.post.generos){
                if(genero === postData.post.generos[generito]){
                    userData.user.perfilMusical[genero][0]+=10;
                }
                userData.user.perfilMusical[genero][1]=(userData.user.perfilMusical[genero][0])/userData.user.numPerfilMusical;
            }      
            sumatoria+=userData.user.perfilMusical[genero][1];
        };
        for (const genero in userData.user.perfilMusical ){  
                if(userData.user.perfilMusical[genero][1] != 0){
                    userData.user.perfilMusical[genero][1]/=sumatoria; 
                }        
        };    
        let userDetails={};
        userDetails.numPerfilMusical=userData.user.numPerfilMusical;
        userDetails.perfilMusical=userData.user.perfilMusical;
        db.doc(`/Usuarios/${req.user.username}`)
        .update(userDetails)
        .then(() => {
            return true;
        })
        .catch((err) => {
            console.error(err);
            return false;
        });
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}
exports.actualizarPMunLikePublicacion= (req) => {
    let postData={};
    let userData = {};
  db.doc(`/Usuarios/${req.user.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.user = doc.data();
        }
        return db
        .doc(`/Publicaciones/${req.params.postId}`)
        .get()
    })
    .then((doc) => {
        if(doc.exists) {
           postData.post=doc.data();    
        }
        let generitos =[];
        let mapa=userData.user.perfilMusical;
        generitos=postData.post.generos;
        mapa=userData.user.perfilMusical;
        let sumatoria=0;
        userData.user.numPerfilMusical--;
        for (const genero in userData.user.perfilMusical ){
            for (const generito in postData.post.generos){
                if(genero === postData.post.generos[generito]){
                    userData.user.perfilMusical[genero][0]-=10;
                }
                userData.user.perfilMusical[genero][1]=(userData.user.perfilMusical[genero][0])/userData.user.numPerfilMusical;
            }      
            sumatoria+=userData.user.perfilMusical[genero][1];
        };
        for (const genero in userData.user.perfilMusical ){  
                if(userData.user.perfilMusical[genero][1] != 0){
                    userData.user.perfilMusical[genero][1]/=sumatoria; 
                }           
        };
        let userDetails={};
        userDetails.numPerfilMusical=userData.user.numPerfilMusical;
        userDetails.perfilMusical=userData.user.perfilMusical;
        db.doc(`/Usuarios/${req.user.username}`)
        .update(userDetails)
        .then(() => {
            return true;
        })
        .catch((err) => {
            console.error(err);
            return false;
        });
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

exports.recomendarPublicacion= (req,res) => {
    let publicaciones = [];
    let publicacionesFiltradas=[];
    let userData = {};
    let likes=[];
    let dislikes=[]
    let comentarios=[];
    db.collection("Publicaciones")
    .get()
    .then((data) => {
      data.forEach((doc) => {
        publicaciones.push({
          postId: doc.id,
          postBody: doc.data().postBody,
          postedBy: doc.data().postedBy,
          postDate: doc.data().postDate,
          comentarios: doc.data().comentarios,
          generos: doc.data().generos,
          likes: doc.data().likes,
          dislikes: doc.data().dislikes,
          Fotolink: doc.data().Fotolink,
          remix: doc.data().remix,
          remixUsername: doc.data().remixUsername,
          remixBody: doc.data().remixBody,
          remixId: doc.data().remixId
        });
      });
      for (const publicacion in publicaciones ){
        if((req.params.username == publicaciones[publicacion].postedBy) ||
        (req.params.username == publicaciones[publicacion].remixUsername)
        ){
            
            publicacionesFiltradas.push(publicaciones[publicacion]);
        }
        
    }
    publicaciones = publicaciones.filter(el => !publicacionesFiltradas.includes(el));
    publicacionesFiltradas=[];  
    if(publicaciones.length==0){
        return res.json({publicaciones});
    }
    return db.collection("Comentarios")
        .get()
    })
    .then((data)=>{
        data.forEach((doc) => {
            comentarios.push(doc.data());
        });
        for ( const pub in publicaciones){
            var encontrado=false;
            for ( const comentario in comentarios ){
                if(comentarios[comentario].postId== publicaciones[pub].postId){
                    if(comentarios[comentario].username==req.params.username){
                        encontrado=true;
                }
            }
            }
            if(encontrado){
                publicacionesFiltradas.push(publicacionesFiltradas[pub]);
                encontrado=false;
                    }
        };
        publicaciones = publicaciones.filter(el => !publicacionesFiltradas.includes(el));
        publicacionesFiltradas=[];
        if(publicaciones.length==0){
            return res.json(publicaciones);
        }
        return db.collection("Likes")
        .get()
        //return res.json(publicacionesFiltradas1);
    }).then((data)=>{
    data.forEach((doc) => {
            likes.push(doc.data());
        });
        for (const pub in publicaciones){
            for (const like in likes){
                if(publicaciones[pub].postId == likes[like].postId){
                    if(likes[like].username == req.params.username){
                        publicacionesFiltradas.push(publicaciones[pub]);
                    }
                }
            }
           
        }
        publicaciones = publicaciones.filter(el => !publicacionesFiltradas.includes(el));
        publicacionesFiltradas=[];
        if(publicaciones.length==0){
            return res.json(publicaciones);
        }
        
        return db.collection("Dislikes")
        .get()

    }).then((data)=>{
        data.forEach((doc) => {
            dislikes.push(doc.data());
        });
        for (const pub in publicaciones){
            for (const dislike in dislikes){
                if(publicaciones[pub].postId == dislikes[dislike].postId){
                    if(dislikes[dislike].username == req.params.username){
                        publicacionesFiltradas.push(publicaciones[pub]);
                    }
                }
            }
           
        }
        publicaciones = publicaciones.filter(el => !publicacionesFiltradas.includes(el));
        publicacionesFiltradas=[];
        if(publicaciones.length==0){
            return res.json(publicaciones);
        }
        return db.doc(`/Usuarios/${req.params.username}`)
        .get()
    })
    .then((doc) => {
        if (doc.exists) {
          userData.user = doc.data();
          }
        else{
            return res.json({});
        }  
        let sumatoria=0;
        let recomendacion=[];
        for (  const pub in publicaciones ){
            for( const genre in publicaciones[pub].generos){
                for (const genero in userData.user.perfilMusical){
                   //return res.json(genero);
                    if(genero == publicaciones[pub].generos[genre]){
                        sumatoria+= userData.user.perfilMusical[genero][1];
                    }
                }
                
             }
             recomendacion.push({
                postId: publicaciones[pub].postId,
                postBody: publicaciones[pub].postBody,
                postedBy: publicaciones[pub].postedBy,
                Fotolink: publicaciones[pub].Fotolink,
                generos: publicaciones[pub].generos,
                puntuacion: sumatoria})
            sumatoria=0;
                
        }
        let recom=[{puntiacion: 0}];
        ordenarDesc(recomendacion,"puntuacion");
        recomendacion= recomendacion.filter(el => el.puntuacion>0);
        return res.json(recomendacion);
        
        
        
    })
    .catch((err) => console.error(err));
    



}

exports.recomendarEvento= (req,res) => {
    let eventos = [];
    let eventosFiltrados=[];
    let userData = {};
    let likes=[];
    let dislikes=[]
    let comentarios=[];
    db.collection("Eventos")
    .get()
    .then((data) => {
      data.forEach((doc) => {
        eventos.push({
          postId: doc.id,
          postBody: doc.data().postBody,
          postedBy: doc.data().postedBy,
          postDate: doc.data().postDate,
          comentarios: doc.data().comentarios,
          generos: doc.data().generos,
          likes: doc.data().likes,
          dislikes: doc.data().dislikes,
          Fotolink: doc.data().Fotolink,
          nombre: doc.data().nombre,
          lugar: doc.data().lugar,
          precio: doc.data().precio,
          fechaEvento: doc.data().fechaEvento,
        });
      });
      for (const evento in eventos ){
        if((req.params.username == eventos[evento].postedBy) 
        ){
            
            eventosFiltrados.push(eventos[evento]);
        }
        
    }
    eventos = eventos.filter(el => !eventosFiltrados.includes(el));
    eventosFiltrados=[];  
    if(eventos.length==0){
        return res.json({eventos});
    }
        return db.collection("LikesEventos")
        .get()
        //return res.json(publicacionesFiltradas1);
    }).then((data)=>{
    data.forEach((doc) => {
            likes.push(doc.data());
        });
        for (const pub in eventos){
            for (const like in likes){
                if(eventos[pub].postId == likes[like].postId){
                    if(likes[like].username == req.params.username){
                        eventosFiltrados.push(eventos[pub]);
                    }
                }
            }
           
        }
        eventos = eventos.filter(el => !eventosFiltrados.includes(el));
        eventosFiltrados=[];
        if(eventos.length==0){
            return res.json(eventos);
        }
        
        return db.collection("DislikeEvento")
        .get()

    }).then((data)=>{
        data.forEach((doc) => {
            dislikes.push(doc.data());
        });
        for (const pub in eventos){
            for (const dislike in dislikes){
                if(eventos[pub].postId == dislikes[dislike].postId){
                    if(dislikes[dislike].username == req.params.username){
                        eventosFiltrados.push(eventos[pub]);
                    }
                }
            }
           
        }
        eventos = eventos.filter(el => !eventosFiltrados.includes(el));
        eventosFiltrados=[];
        if(eventos.length==0){
            return res.json(eventos);
        }
        return db.doc(`/Usuarios/${req.params.username}`)
        .get()
    })
    .then((doc) => {
        if (doc.exists) {
          userData.user = doc.data();
          }
        else{
            return res.json({});
        }  
        let sumatoria=0;
        let recomendacion=[];
        for (  const pub in eventos ){
            for( const genre in eventos[pub].generos){
                for (const genero in userData.user.perfilMusical){
                   //return res.json(genero);
                    if(genero == eventos[pub].generos[genre]){
                        sumatoria+= userData.user.perfilMusical[genero][1];
                    }
                }
                
             }
             recomendacion.push({
                postId: eventos[pub].postId,
                postBody: eventos[pub].postBody,
                postedBy: eventos[pub].postedBy,
                Fotolink: eventos[pub].Fotolink,
                generos: eventos[pub].generos,
                nombre: eventos[pub].nombre,
                puntuacion: sumatoria})
            sumatoria=0;
                
        }
        let recom=[{puntiacion: 0}];
        ordenarDesc(recomendacion,"puntuacion");
        recomendacion= recomendacion.filter(el => el.puntuacion>0);
        return res.json(recomendacion);
        
        
        
    })
    .catch((err) => console.error(err));
    



}