import { SET_POST, SET_USER } from "./constants";

const setUser = payload => ({
    type: SET_USER,
    payload
})

const setPosts = (payload) => ({
    type: SET_POST,
    payload
})
const setConversations = payload => ({
    type: SET_USER,
    payload
})


export { setUser, setPosts, setConversations };