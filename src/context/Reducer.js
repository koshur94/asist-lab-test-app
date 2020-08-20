import {
  SET_LOADING, SEARCH_POSTS, GET_POSTS, GET_POST, GET_ALBUMS,
  GET_ALBUM, POST_PHOTO, DELETE_PHOTO, POST_COMMENT, GET_PHOTOS,
  GET_COMMENTS, GET_PHOTO, SET_TITLE, DELETE_POST, CHANGE_PHOTO
} from './types';

const handlers = {
  [SET_LOADING]: state => ({ ...state, loading: true }),
  [SEARCH_POSTS]: (state, action) => ({ ...state, posts: action.payload, loading: false}),
  [GET_POSTS]: (state, action) => ({ ...state, posts: action.payload, loading: false}),
  [GET_POST]: (state, action) => ({ ...state, post: action.payload, loading: false}),
  [DELETE_POST]: (state, action) => {
    let delIndex = state.posts.findIndex(post => +post.id === +action.payload);
    state.posts.splice(delIndex, 1);
    return ({ ...state, post: {}, comments: [], loading: false})
  },
  [GET_ALBUMS]: (state, action) => ({ ...state, albums: action.payload, loading: false}),
  [GET_ALBUM]: (state, action) => ({ ...state, album: action.payload, loading: false}),
  [GET_PHOTO]: (state, action) => ({ ...state, photo: action.payload, loading: false}),
  [GET_PHOTOS]: (state, action) => ({ ...state, photos: action.payload, loading: false}),
  [POST_PHOTO]: (state, action) => ({ ...state, photos: [action.payload, ...state.photos], loading: false}),
  [CHANGE_PHOTO]: (state, action) => {
    let delIndex = state.photos.findIndex(photo => +photo.id === +action.payload.id);
    state.photos.splice(delIndex, 1, action.payload);
    return ({ ...state, loading: false})
  },
  [DELETE_PHOTO]: (state, action) => {
    let delIndex = state.photos.findIndex(photo => +photo.id === +action.payload.id);
    state.photos.splice(delIndex, 1);
    return ({ ...state, loading: false})
  },
  [POST_COMMENT]: (state, action) => ({ ...state, comments: [...state.comments, action.payload]}),
  [GET_COMMENTS]: (state, action) => ({ ...state, comments: action.payload, loading: false}),
  [SET_TITLE]: (state, action) => ({ ...state, title: action.payload}),
  DEFAULT: state => state
};

export const Reducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
}
