import { GET_POSTS, ADD_POST, DELETE_POST, FILTER_POSTS } from './actions';

const initalState = {
    posts: [],
    filter: ''
};

export default (state = initalState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.posts
            }
        case ADD_POST:
            return {
                ...state,
                posts: state.posts.concat(action.post)
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.id)
            }
        case FILTER_POSTS:
            return {
                ...state,
                filter: action.value
            }
    }

    return state;
}