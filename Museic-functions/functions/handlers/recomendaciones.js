const { db, admin } = require("../utilidades/administrador");
const app = require("express")();
const{
    getUserDetails,
}=require("./usuarios");


function ordenarAsc(p_array_json, p_key) {
    p_array_json.sort(function (a, b) {
       return parseFloat(a.puntuacion) - parseFloat(b.puntuacion);;
    });
  }
  function ordenarDesc(p_array_json, p_key) {
    ordenarAsc(p_array_json, p_key); p_array_json.reverse(); 
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

exports.actualizarPMunLikePublicacion= (req,res) => {
    let publicaciones = [];
    let publicacionesFiltradas=[];
    let userData = {};
    let likes=[];
    let dislikes=[]
    let comentarios=[];
    db.collection("Publicaciones")
    .orderBy("postDate", "desc")
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
        if((req.body.username == publicaciones[publicacion].postedBy) ||
        (req.body.username == publicaciones[publicacion].remixUsername)
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
        .orderBy("postDate", "desc")
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
                    if(comentarios[comentario].username==req.body.username){
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
                    if(likes[like].username == req.body.username){
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
                    if(dislikes[dislike].username == req.body.username){
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
        return db.doc(`/Usuarios/${req.body.username}`)
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