import {
    SET_PUBLICACIONES,
    LIKE_PUBLICACION,
    UNLIKE_PUBLICACION,
    LOADING_DATA,
    DELETE_PUBLICACION,
    POST_PUBLICACION,
    POST_EVENTO,
    SET_PUBLICACION,
    FOLLOW_USER,
    UNFOLLOW_USER
  } from '../types';
  
  const initialState = {
    eventos:[],
    publicaciones: [],
    publicacion: {},
    seguidos: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case SET_PUBLICACIONES:
        return {
          ...state,
          publicaciones: action.payload,
          loading: false
        };
      case LIKE_PUBLICACION:
      case UNLIKE_PUBLICACION:
        let index = state.publicaciones.findIndex((publicacion) => publicacion.postId === action.payload.postId);
        state.publicaciones[index] = action.payload;
        return {
          ...state
        };
        case POST_EVENTO:
          return {
            ...state,
            eventos: [action.payload, ...state.eventos]
          };

      case POST_PUBLICACION:
        return {
          ...state,
          publicaciones: [action.payload, ...state.publicaciones]
        };
      case DELETE_PUBLICACION:
        let index2 = state.publicaciones.findIndex((publicacion) => publicacion.postId === action.payload);
        state.publicaciones.splice(index2, 1);
        return {
          ...state
        };
      case FOLLOW_USER:
      case UNFOLLOW_USER:
        let indexU = state.seguidos.findIndex((seguido) => seguido.follows === action.payload.username);
        state.seguidos[indexU] = action.payload;
        return {
          ...state
        };
      default:
        return state;
    }
  }