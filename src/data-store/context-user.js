import { createContext, useReducer, useContext } from "react";
import { SET_USER, SET_LOGIN, SET_LOGOUT } from "./constants";

const Context = createContext();

const initialState = {
    user: {
        id: "1233132123132",
        username: "1233132123132",
        password: "123",
        email: "21522458@gm.uit.edu.vn",
        role: "lecturer",
        personalInfo: {
            dateOfBirth: {
                $date: "2000-12-11T17:00:00.000Z"
            },
            name: "abcd",
            gender: "male",
            phone: "06165165",
            facultyId: "SE",
            program: "CLC"
        },
        classes: [],
        scheduleAggregations: {},
        creditInfo: {
            semesterId: null,
            subjects: []
        },
        programs: null
    },
    isloggedIn: false,
    role: null,
    adminAccounts: [],
    lecturers: [],
}

/*
note student first load:
    subjects
    faculties
    lecturerInfos
    schoolClasses (get from ids)
*/



function userReducer(state, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload.user,
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

export { useUserContext, UserContextProvider, initialState as UserInitialState };
export default UserContextProvider;



