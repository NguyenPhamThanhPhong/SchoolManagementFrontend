import React, { createContext, useReducer, useContext } from 'react';
import { SET_POSTS, APPEND_POST, REMOVE_POST, SET_LOGOUT, SET_CURRENT_POST } from './constants';

const Context = createContext();

const initialState = {
    posts: [],
    currentPost: null,
}

function postReducer(state, action) {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
            }
        case SET_CURRENT_POST:
            return {
                ...state,
                currentPost: action.payload,
            }
        case APPEND_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
            }
        case REMOVE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload),
            }
        case SET_LOGOUT:
            return initialState;
    }
}

const PostContextProvider = ({ children }) => {
    const [postState, dispatchPost] = useReducer(postReducer, initialState);
    return (
        <Context.Provider value={[postState, dispatchPost]}>
            {children}
        </Context.Provider>
    );
};

const usePostContext = () => {
    const [postState, dispatchPost] = useContext(Context);
    return [postState, dispatchPost];
};

export { usePostContext, PostContextProvider, initialState as PostInitialState };
export default PostContextProvider;