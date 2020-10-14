import {
    SET_PUBLICACIONES,
    LIKE_PUBLICACION,
    UNLIKE_PUBLICACION,
    LOADING_DATA,
    DELETE_PUBLICACION,
    POST_PUBLICACION,
    SET_PUBLICACION
  } from '../types';
  
  const initialState = {
    publicaciones: [],
    publicacion: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case POST_PUBLICACION:
        return {
          ...state,
          publicaciones: [action.payload, ...state.publicaciones]
        };
      default:
        return state;
    }
  }