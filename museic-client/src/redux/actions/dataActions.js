import {
    SET_PUBLICACIONES,
    SET_EVENTOS,
    LOADING_DATA,
    LIKE_PUBLICACION,
    UNLIKE_PUBLICACION,
    DELETE_PUBLICACION,
    LIKE_EVENTO,
    UNLIKE_EVENTO,
    SET_ERRORS,
    POST_PUBLICACION,
    POST_EVENTO,
    CLEAR_ERRORS,
    LOADING_UI,
    STOP_LOADING_UI,
    SUBMIT_COMMENT,
    UNFOLLOW_USER,
    FOLLOW_USER
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

  export const deletePublicacion = (postId) => (dispatch) => {
    axios.delete(`/publicaciones/${postId}`)
      .then(() => {
        dispatch({ type: DELETE_PUBLICACION, payload: postId});
      })
      .catch((err) => console.log(err));
  };

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