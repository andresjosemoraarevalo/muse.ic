import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_PUBLICACION,
  UNLIKE_PUBLICACION,
  FOLLOW_USER,
  UNFOLLOW_USER,
  MARK_NOTIFICATIONS_READ
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  seguidos: [],
  publicaciones: [],
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
    case MARK_NOTIFICATIONS_READ:
        state.notifications.array.forEach(not => not.read = true );
        return {
          ...state
        }
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
