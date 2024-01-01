import { createContext, useReducer, useContext } from "react";
import { SET_FACULTIES, SET_CURRENT_FACULTY, SET_LOGOUT } from "./constants";

const Context = createContext();

const initialState = {
    faculties: [],
    currentFaculty: null,
}

function facultyReducer(state, action) {
    switch (action.type) {
        case SET_FACULTIES:
            return {
                ...state,
                faculties: action.payload,
            }
        case SET_CURRENT_FACULTY:
            return {
                ...state,
                currentFaculty: action.payload,
            }
        case SET_LOGOUT:
            return initialState;
    }
}

const FacultyContextProvider = ({ children }) => {
    const [FacultyState, dispatchFaculty] = useReducer(facultyReducer, initialState);
    return (
        <Context.Provider value={[FacultyState, dispatchFaculty]}>
            {children}
        </Context.Provider>
    );
};

const useFacultyContext = () => {
    const [FacultyState, dispatchFaculty] = useContext(Context);
    return [FacultyState, dispatchFaculty];
};

export { useFacultyContext, FacultyContextProvider, initialState as FacultyInitialState };
export default FacultyContextProvider;