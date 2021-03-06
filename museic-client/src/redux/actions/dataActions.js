import {
    SET_PUBLICACIONES,
    SET_EVENTOS,
    LOADING_DATA,
    LIKE_PUBLICACION,
    UNLIKE_PUBLICACION,
    DONTLIKE_PUBLICACION,
    UNDODONTLIKE_PUBLICACION,
    DELETE_PUBLICACION,
    LIKE_EVENTO,
    UNLIKE_EVENTO,
    SET_PUBLICACION,
    SET_ERRORS,
    POST_PUBLICACION,
    POST_EVENTO,
    CLEAR_ERRORS,
    LOADING_UI,
    STOP_LOADING_UI,
    SUBMIT_COMMENT,
    UNFOLLOW_USER,
    FOLLOW_USER,
    SHARE_PUBLICACION,
    DELETE_EVENTO,
    SET_USUARIOS,
    SET_CHAT,
    SET_MENSAJES,
    POST_MENSAJE,
    DISLIKE_EVENTO,
    UNDISLIKE_EVENTO,
    SET_RECOMENDACIONES,
    SET_RECOMENDACIONESE
  } from '../types';
import axios from 'axios';

//get todas las publicaciones
export const getPublicaciones = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios.get('/getPublicaciones')
    .then(res => {
      dispatch({
        type: SET_PUBLICACIONES,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_PUBLICACIONES,
        payload: []
      })
    });
};
export const getUsuarios = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios.get('/getUsuarios')
    .then(res => {
      dispatch({
        type: SET_USUARIOS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_USUARIOS,
        payload: []
      })
    });
};

export const setChat =(chatt) => (dispatch)=>{
  dispatch({
    type: SET_CHAT,
    payload: {chat: chatt}
  });
  
}
// get todos los mensajes de un usuario
export const getMensajes = (chatt) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios.post('/Mensajes', {chat: chatt} )
  .then(res => {
    dispatch({
      type: SET_MENSAJES,
      payload: res.data
    })
  })
  .catch(err => {
    dispatch({
      type: SET_MENSAJES,
      payload: []
    })
  });
} 
//obtener recomendaciones
// ${username}
export const getRecomendaciones = (username)  => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios.get(`/getRecomendacion/${username}`)
  .then(res => {
    dispatch({
      type: SET_RECOMENDACIONES,
      payload: res.data
    })
  })
  .catch(err => {
    dispatch({
      type: SET_RECOMENDACIONES,
      payload: []
    })
  });
} 
export const getRecomendacionesE = (username)  => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios.get(`/getRecomendacionE/${username}`)
  .then(res => {
    dispatch({
      type: SET_RECOMENDACIONESE,
      payload: res.data
    })
  })
  .catch(err => {
    dispatch({
      type: SET_RECOMENDACIONESE,
      payload: []
    })
  });
} 

//post un mensaje nuevo 
export const postMensaje = (newMensaje) => (dispatch) => {
  dispatch({ type: LOADING_UI});
  axios
    .post('/crearMensaje', newMensaje)
    .then((res) => {
      dispatch({
        type: POST_MENSAJE,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    }); 
};

//get todas los eventos
export const getEventos = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios.get('/getEventos')
    .then(res => {
      dispatch({
        type: SET_EVENTOS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_EVENTOS,
        payload: []
      })
    });
};

export const getPublicacion = (postId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.get(`/publicaciones/${postId}`)
    .then(res => {
      dispatch({
        type: SET_PUBLICACION,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

export const followProfile = (username) => (dispatch) => {
  axios.get(`/usuario/${username}/follow`)
    .then(res => {
      dispatch({
        type: FOLLOW_USER,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
};

export const unfollowProfile = (username) => (dispatch) => {
  axios.get(`/usuario/${username}/unfollow`)
    .then(res => {
      dispatch({
        type: UNFOLLOW_USER,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
};

//like publicacion
export const likePublicacion = (postId) => (dispatch) => {
  axios.get(`/publicaciones/${postId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_PUBLICACION,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
};


//unlike publicacion
export const unlikePublicacion = (postId) => (dispatch) => {
  axios.get(`/publicaciones/${postId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_PUBLICACION,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
};

//like publicacion
export const DontlikePublicacion = (postId) => (dispatch) => {
  axios.get(`/publicaciones/${postId}/dontlike`)
    .then(res => {
      dispatch({
        type: DONTLIKE_PUBLICACION,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
};


//unlike publicacion
export const undoDontlikePublicacion = (postId) => (dispatch) => {
  axios.get(`/publicaciones/${postId}/undodontlike`)
    .then(res => {
      dispatch({
        type: UNDODONTLIKE_PUBLICACION,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
};

//like evento
export const likeEvento = (postId) => (dispatch) => {
  axios.get(`/Eventos/${postId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_EVENTO,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
};


//unlike evento
export const unlikeEvento = (postId) => (dispatch) => {
  axios.get(`/Eventos/${postId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_EVENTO,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
};

//dislike Evento
export const dislikeEvento = (postId) => (dispatch) => {
  axios.get(`/Eventos/${postId}/dislike`)
    .then(res => {
      dispatch({
        type: DISLIKE_EVENTO,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
}

export const undislikeEvento = (postId) => (dispatch) => {
  axios.get(`/Eventos/${postId}/undislike`)
    .then(res => {
      dispatch({
        type: UNDISLIKE_EVENTO,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
}

//Realizar Comentarios:
export const comentarPublicacion = (postId , dataComentario) => (dispatch) => {
  axios.post(`/publicaciones/${postId}/comentar`, dataComentario)
  .then(res => {
    dispatch({
      type: SUBMIT_COMMENT,
      payload: res.data,
    });
    dispatch(clearErrors());
  })
  .catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  })
  
}

// post a evento 
export const postEvento = (newEvento) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/crearEvento', newEvento)
    .then((res) => {
      dispatch({
        type: POST_EVENTO,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    }); 
};

// Post a publicacion
export const postPublicacion = (newPublicacion) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/crearPublicacion', newPublicacion)
      .then((res) => {
        dispatch({
          type: POST_PUBLICACION,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      }); 
  };


  // Share a publicacion
export const sharePublicacion = (newPublicacion) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/crearPublicacion', newPublicacion)
    .then((res) => {
      dispatch({
        type: SHARE_PUBLICACION,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    }); 
};

  export const deletePublicacion = (postId) => (dispatch) => {
    axios.delete(`/publicaciones/${postId}`)
      .then(() => {
        dispatch({ type: DELETE_PUBLICACION, payload: postId});
      })
      .catch((err) => console.log(err));
  };

  export const deleteEvento= (postId) => (dispatch) => {
    axios.delete(`/Eventos/${postId}`)
      .then(() => {
        dispatch({ type: DELETE_EVENTO, payload: postId});
      })
      .catch((err) => console.log(err));
  };

  export const editPublicacion = (postDetails, postId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.post(`/editPublicacion/${postId}`, postDetails)
      .then(() => {
        //dispatch(getUserData());
        window.location.reload(true);
        //window.location.href = `/usuarios/${postDetails.postedBy}`;
      })
      .catch((err) => console.log(err));
  };
  export const editEvento = (postDetails, postId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.post(`/editEvento/${postId}`, postDetails)
      .then(() => {
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };
  export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .post('/usuario/FotoPerfil', formData)
      .then(() => {
        dispatch(getUserData());
      })
      .catch((err) => console.log(err));
  };
  
  export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.post('/usuarioDetails',userDetails)
      .then(() =>{
        dispatch(getUserData());
      })
      .catch((err) => console.log(err));
  }

  export const getUserData = (username) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/usuario/${username}`)
      .then((res) => {
        dispatch({
          type: SET_PUBLICACIONES,
          payload: res.data.publicaciones
        });
      })
      .catch(() => {
        dispatch({
          type: SET_PUBLICACIONES,
          payload: null
        })
      });
  };

  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };