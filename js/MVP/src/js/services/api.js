import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const getAllPosts = () => {
  return axios
    .get(`${BASE_URL}/posts`)
    .then(response => response.data)
    // .then(data => console.log(data))
    .catch(err => console.log(err));
};

export const addPost = post => {
  return axios
    .post(`${BASE_URL}/posts`, post)
    .then(response => response.data)
    .catch(err => console.log(err));
};

export const deletePost = id => {
  return axios
    .delete(`${BASE_URL}/posts/${id}`)
    .catch(err => console.log(err));
};
