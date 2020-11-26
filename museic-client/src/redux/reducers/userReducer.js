import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_PUBLICACION,
  UNLIKE_PUBLICACION,
  LIKE_EVENTO,
  UNLIKE_EVENTO,
  FOLLOW_USER,
  UNFOLLOW_USER,
  MARK_NOTIFICATIONS_READ,
  DONTLIKE_PUBLICACION,
  UNDODONTLIKE_PUBLICACION
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  likesE:[],
  dislikes: [],
  seguidos: [],
  seguidores: [],
  publicaciones: [],
  notificaciones: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_PUBLICACION:
      return {
        ...state,
        dislikes: state.dislikes.filter(
          (dislike) => dislike.postId !== action.payload.postId
        ),
        likes: [
          ...state.likes,
          {
            username: state.credentials.username,
            postId: action.payload.postId,
          },
        ],
      };
    case UNLIKE_PUBLICACION:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.postId !== action.payload.postId
        ),
      };
    case DONTLIKE_PUBLICACION:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.postId !== action.payload.postId 
        ),
        dislikes: [
          ...state.dislikes,
          {
            username: state.credentials.username,
            postId: action.payload.postId,
          },
        ],
      };
    case UNDODONTLIKE_PUBLICACION:
      return {
        ...state,
        dislikes: state.dislikes.filter(
          (dislike) => dislike.postId !== action.payload.postId
        ),
      }
      case LIKE_EVENTO:
        return {
          ...state,
          likesE: [
            ...state.likesE,
            {
              username: state.credentials.username,
              postId: action.payload.postId,
            },
          ],
        };
      case UNLIKE_EVENTO:
        return {
          ...state,
          likesE: state.likes.filter(
            (like) => like.postId !== action.payload.postId
          ),
        };
    case MARK_NOTIFICATIONS_READ:
        state.notificaciones.array.forEach(not => not.read = true );
        return {
          ...state
        };
    case FOLLOW_USER:
      return {
        ...state,
        seguidos: [
          ...state.seguidos,
          {
            username: state.credentials.username,
            follows: action.payload.username,
          },
        ],
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        seguidos: state.seguidos.filter(
          (seguido) => seguido.follows !== action.payload.username
        ),
      };
    default:
      return state;
  }
}
