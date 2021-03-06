import {
  SET_PUBLICACIONES,
  LIKE_PUBLICACION,
  UNLIKE_PUBLICACION,
  DONTLIKE_PUBLICACION,
  UNDODONTLIKE_PUBLICACION,
  LOADING_DATA,
  DELETE_PUBLICACION,
  POST_PUBLICACION,
  POST_EVENTO,
  SET_PUBLICACION,
  SET_EVENTOS,
  FOLLOW_USER,
  UNFOLLOW_USER,
  LIKE_EVENTO,
  UNLIKE_EVENTO,
  DELETE_EVENTO,
  SET_USUARIOS,
  SET_CHAT,
  SET_MENSAJES,
  POST_MENSAJE,
  SUBMIT_COMMENT,
  DISLIKE_EVENTO,
  UNDISLIKE_EVENTO,
  SET_RECOMENDACIONES,
  SET_RECOMENDACIONESE
} from "../types";

const initialState = {
  eventos: [],
  recomendaciones:[],
  recomendacionese:[],
  chat: {},
  mensajes: [],
  publicaciones: [],
  publicacion: {},
  recomendacion:{},
  evento: {},
  seguidos: [],
  seguidores: [],
  usuarios: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_PUBLICACIONES:
      return {
        ...state,
        publicaciones: action.payload,
        loading: false,
      };

    case SET_USUARIOS:
      return {
        ...state,
        usuarios: action.payload,
        loading: false,
      };
    case SET_EVENTOS:
      return {
        ...state,
        eventos: action.payload,
        loading: false,
      };
    case SET_RECOMENDACIONES:
      return{
        ...state,
        recomendaciones: action.payload,
        loading: false,
      };
      case SET_RECOMENDACIONESE:
      return{
        ...state,
        recomendacionese: action.payload,
        loading: false,
      };
    case LIKE_EVENTO:
    case UNLIKE_EVENTO:
      let index3 = state.eventos.findIndex(
        (evento) => evento.postId === action.payload.postId
      );
      state.eventos[index3] = action.payload;
      if (state.evento.postId === action.payload.postId) {
        state.evento = action.payload;
      }
      return {
        ...state,
      };
    case DISLIKE_EVENTO:
    case UNDISLIKE_EVENTO:
      let index5 = state.eventos.findIndex(
        (evento) => evento.postId === action.payload.postId
      );
      state.eventos[index5] = action.payload;
      if (state.evento.postId === action.payload.postId) {
        state.evento = action.payload;
      }
      return {
        ...state,
      };
    case SET_PUBLICACION:
      return {
        ...state,
        publicacion: action.payload,
      };
    case SET_CHAT:
      return {
        ...state,
        chat: action.payload,
        loading: false,
      };
    case SET_MENSAJES:
      return {
        ...state,
        mensajes: action.payload,
        loading: false,
      };
    case POST_MENSAJE:
      return {
        ...state,
        mensajes: [action.payload, ...state.mensajes],
      };
    case LIKE_PUBLICACION:
    case UNLIKE_PUBLICACION:
      let index = state.publicaciones.findIndex(
        (publicacion) => publicacion.postId === action.payload.postId
      );
      state.publicaciones[index] = action.payload;
      if (state.publicacion.postId === action.payload.postId) {
        state.publicacion = action.payload;
      }
      return {
        ...state,
      };
    case DONTLIKE_PUBLICACION:
    case UNDODONTLIKE_PUBLICACION:
      let index4 = state.publicaciones.findIndex(
        (publicacion) => publicacion.postId === action.payload.postId
      );
      state.publicaciones[index4] = action.payload;
      if (state.publicacion.postId === action.payload.postId) {
        state.publicacion = action.payload;
      }
      return {
        ...state,
      };
    case POST_EVENTO:
      return {
        ...state,
        eventos: [action.payload, ...state.eventos],
      };

    case POST_PUBLICACION:
      return {
        ...state,
        publicaciones: [action.payload, ...state.publicaciones],
      };
    case DELETE_PUBLICACION:
      let index2 = state.publicaciones.findIndex(
        (publicacion) => publicacion.postId === action.payload
      );
      state.publicaciones.splice(index2, 1);
      return {
        ...state,
      };
    case DELETE_EVENTO:
      let indexe = state.eventos.findIndex(
        (evento) => evento.postId === action.payload
      );
      state.eventos.splice(indexe, 1);
      return {
        ...state,
      };
    case FOLLOW_USER:
    case UNFOLLOW_USER:
      let indexU = state.seguidos.findIndex(
        (seguido) => seguido.follows === action.payload.username
      );
      state.seguidos[indexU] = action.payload;
      return {
        ...state,
      };
    case SUBMIT_COMMENT:
      let com = state.publicacion.comentarios;
      com = com + 1;
      let indexP = state.publicaciones.findIndex(
        (pub) => pub.postId === state.publicacion.postId
      );
      state.publicaciones[indexP].comentarios = com;
      return {
        ...state,
        publicacion: {
          ...state.publicacion,
          listacomentarios: [
            action.payload,
            ...state.publicacion.listacomentarios,
          ],
          comentarios: com,
        },
      };
    default:
      return state;
  }
}
