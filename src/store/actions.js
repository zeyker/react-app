import axios from '../axios';

export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const FILTER_POSTS = 'FILTER_POSTS';

export const getPosts = () => {

    return async dispatch => {
        try {
            const response = await axios.get('/posts');
            const resData = await response.data;
            dispatch({ type: GET_POSTS, posts: resData });
        } catch (error) {
            throw error;
        }
    }
}

export const addPost = (name, description) => {

    return async dispatch => {
        try {
            const response = await axios.post('/posts', {
                name: name,
                description: description
            });
            const resData = await response.data;
            dispatch({ type: ADD_POST, post: resData });
        } catch (error) {

        }
    }
}


export const deletePost = (id) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`/posts/${id}`);
            const resData = await response.data;
            dispatch({ type: DELETE_POST, id: resData.deleted.id });
        } catch (error) {

        }
    }
}

export const filterPosts = (value) => {
    return { type: FILTER_POSTS , value: value};
}