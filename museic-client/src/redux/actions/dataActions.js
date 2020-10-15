import {
    SET_PUBLICACIONES,
    LOADING_DATA,
    LIKE_PUBLICACION,
    UNLIKE_PUBLICACION,
    DELETE_PUBLICACION,
    SET_ERRORS,
    POST_PUBLICACION,
    CLEAR_ERRORS,
    LOADING_UI,
    STOP_LOADING_UI,
    SUBMIT_COMMENT
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