const { db, admin } = require("../utilidades/administrador");
const app = require("express")();
const{
    getUserDetails,
}=require("./usuarios");

const actualizarPMLikePublicacion= (req) => {
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
                //return res.json([genero ,postData.post.generos[generito]]);
                if(genero === postData.post.generos[generito]){
                    
                    userData.user.perfilMusical[genero][0]+=10;
                    userData.user.perfilMusical[genero][1]=(userData.user.perfilMusical[genero][0])/userData.user.numPerfilMusical;
                }
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
        db.doc(`/Usuarios/${req.body.username}`)
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