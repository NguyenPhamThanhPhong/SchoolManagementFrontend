import { createContext, useReducer, useContext } from "react";
import { SET_USER, SET_LOGIN } from "./constants";

const Context = createContext();

const initialState = {
    user: null,
    isloggedIn: false,
    role: null,
    adminAccounts: [],
}

function userReducer(state, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                isloggedIn: action.payload.isloggedIn,
            }
        case SET_LOGIN:
            return {
                ...state,
                user: action.payload.user,
                isloggedIn: action.payload.isloggedIn,
                role: action.payload.role,
            }
        case SET_LOGOUT:
            return initialState;
    }
}

const UserContextProvider = ({ children }) => {
    const [userState, dispatchUser] = useReducer(userReducer, initialState);
    return (
        <Context.Provider value={[userState, dispatchUser]}>
            {children}
        </Context.Provider>
    );
};

const useUserContext = () => {
    const [userState, dispatchUser] = useContext(Context);
    return [userState, dispatchUser];
};

export { useUserContext, UserContextProvider };
export default UserContextProvider;



