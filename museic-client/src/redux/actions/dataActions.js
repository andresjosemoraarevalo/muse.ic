import {
    SET_PUBLICACIONES,
    SET_EVENTOS,
    LOADING_DATA,
    LIKE_PUBLICACION,
    UNLIKE_PUBLICACION,
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
    POST_MENSAJE
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

export const setChat =(chat) => (dispatch)=>{
  dispatch({
    type: SET_CHAT,
    payload: chat
  });
  getMensajes(chat);
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
//post un mensaje nuevo 
export const postMensaje = (newMensaje) => (dispatch) => {
  dispatch({ type: LOADING_UI });
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


//unlike publicacion
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

  /*export const editPostDetails = (postDetails, postId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.post('/postDetails', postDetails)
      .then(() => {
        dispatch(getUserData(postDetails.postedBy));
      })
      .catch((err) => console.log(err));
  };*/

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