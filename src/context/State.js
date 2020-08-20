import React, { useReducer } from 'react';
import {Context} from './Context';
import {Reducer} from './Reducer';
import axios from 'axios';
import {
  SET_LOADING, SEARCH_POSTS, GET_POSTS, GET_POST, GET_ALBUMS,
  GET_ALBUM, POST_PHOTO, DELETE_PHOTO, POST_COMMENT, GET_PHOTOS,
  GET_COMMENTS, GET_PHOTO, SET_TITLE, DELETE_POST, CHANGE_PHOTO
} from './types';

export const url = 'https://jsonplaceholder.typicode.com';

export const State = ({ children }) => {
  const initialState = {
    post: {},
    posts: [],
    comments: [],
    album: {},
    albums: [],
    photos: [],
    photo: {},
    title: 'Asist-lab-test-app',
    loading: false
  }

  const [state, dispatch] = useReducer(Reducer, initialState);

  const setTitle = title => {
    dispatch({type: SET_TITLE, payload: title})
  }

  const getPost = async id => {
    try {
      setLoading();
      const response = await axios.get(`${url}/posts/${id}`);
      dispatch({type: GET_POST, payload: response.data});
    } catch (err) {
      console.error(err);
    }
  }

  const getPosts = async () => {
    try {
      setLoading();
      const response = await axios.get(`${url}/posts/`);
      dispatch({type: GET_POSTS, payload: response.data});
    } catch (err) {
      console.error(err);
    }
  }

  const deletePost = async id => {
    try {
      setLoading();
      await axios.delete(`${url}/posts/${id}`);
      dispatch({type: DELETE_POST, payload: id});
    } catch (err) {
      console.error(err);
    }
  }

  const getAlbum = async id => {
    try {
      setLoading();
      const response = await axios.get(`${url}/albums/${id}`);
      dispatch({type: GET_ALBUM, payload: response.data});
    } catch(err) {
      console.error(err);
    }
  }

  const getPhoto = async (id, photoId) => {
    try {
      setLoading();
      const response = await axios.get(`${url}/albums/${id}/photos?id=${photoId}`);
      dispatch({type: GET_PHOTO, payload: response.data});
    } catch(err) {
      console.error(err);
    }
  }

  const getPhotos = async id => {
    try {
      setLoading();
      const response = await axios.get(`${url}/albums/${id}/photos`);
      dispatch({type: GET_PHOTOS, payload: response.data});
    } catch(err) {
      console.error(err);
    }
  }

  const getAlbums = async () => {
    try {
      setLoading();
      const response = await axios.get(`${url}/albums/`);
      dispatch({type: GET_ALBUMS, payload: response.data});
    } catch (err) {
      console.error(err);
    }
  }

  const postPhoto = async (id, photoData) => {
    await axios.post(`${url}/albums/${id}/photos`, photoData)
            .then(response => {
              dispatch({type: POST_PHOTO, payload: response.data});
            })
            .catch(err => console.error(err));  
  };

  const changePhoto = async (id, formData) => {
    await axios.post(`${url}/albums/${id}/photos`, formData)
            .then(response => {
              dispatch({type: CHANGE_PHOTO, payload: formData});
            })
            .catch(err => console.error(err)); 
  };

  const deletePhoto = photo => {
    // await axios.delete(`${url}/albums/${photo.albumId}/photos?id=${photo.id}`);
    dispatch({type: DELETE_PHOTO, payload: photo});
  }

  const getComments = async id => {
    try {
      setLoading();
      const response = await axios.get(`${url}/posts/${id}/comments`);
      dispatch({type: GET_COMMENTS, payload: response.data});
    } catch (err) {
      console.error(err)
    }
  };

  const postComment = async (id, commentData) => {
    await axios.post(`${url}/posts/${id}/comments`, commentData)
            .then(response => {
              dispatch({type: POST_COMMENT, payload: response.data});
            })
            .catch(err => console.error(err));  
  };

  const searchPosts = async word => {
    try {
      setLoading();
      const response = await axios.get(`${url}/posts/`);
      const result = response.data.filter(post => {
        let body = post.body.toLowerCase();
        let title = post.title.toLowerCase();
        let value = word.toLowerCase();
        return body.includes(value) || title.includes(value);
      })
      dispatch({type: SEARCH_POSTS, payload: result})
      console.log(result)
    } catch (err) {
      console.error(err)
    }
  }

  const setLoading = () => dispatch({type: SET_LOADING});

  const { post, posts, comments, album, albums, photos, photo, loading, title } = state;

  return (
    <Context.Provider value={{
      setLoading, getPost, getPosts, getAlbum, getPhotos,
      getAlbums, getComments, getPhoto, setTitle, postComment,
      deletePost, searchPosts, postPhoto, changePhoto, deletePhoto,
      post, posts, comments, album, albums, photos, photo, loading, title
    }}>
      {children}
    </Context.Provider>
  )
}