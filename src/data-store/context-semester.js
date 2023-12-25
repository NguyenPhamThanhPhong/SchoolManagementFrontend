import { createContext, useReducer, useContext } from "react";
import { SET_SEMESTERS, SET_CURRENT_SEMESTER, SET_LOGOUT } from "./constants";

const Context = createContext();

const initialState = {
    semesters: [],
    currentSemester: null,
}

function semesterReducer(state, action) {
    switch (action.type) {
        case SET_SEMESTERS:
            return {
                ...state,
                semesters: action.payload.semesters,
            }
        case SET_CURRENT_SEMESTER:
            return {
                ...state,
                currentSemester: action.payload.currentSemester,
            }
        case SET_LOGOUT:
            return initialState;
    }
}

const SemesterContextProvider = ({ children }) => {
    const [semesterState, dispatchSemester] = useReducer(semesterReducer, initialState);
    return (
        <Context.Provider value={[semesterState, dispatchSemester]}>
            {children}
        </Context.Provider>
    );
};

const useSemesterContext = () => {
    const [semesterState, dispatchSemester] = useContext(Context);
    return [semesterState, dispatchSemester];
};

export { useSemesterContext, SemesterContextProvider, initialState as SemesterState };
export default SemesterContextProvider;