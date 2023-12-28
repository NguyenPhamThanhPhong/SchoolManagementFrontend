import { createContext, useReducer, useContext } from "react";
import { SET_SUBJECTS, SET_CURRENT_SUBJECT, APPEND_SUBJECT, REMOVE_SUBJECT } from "./constants";

const Context = createContext();

const initialState = {
    subjects: [],
    currentSubject: null,
}

function subjectReducer(state, action) {
    switch (action.type) {
        case SET_SUBJECTS:
            return {
                ...state,
                subjects: action.payload,
            }
        case SET_CURRENT_SUBJECT:
            return {
                ...state,
                currentSubject: action.payload,
            }
        case APPEND_SUBJECT:
            return {
                ...state,
                subjects: [...state.subjects, action.payload],
            }
        case REMOVE_SUBJECT:
            return {
                ...state,
                subjects: state.subjects.filter(subject => subject.id !== action.payload),
            }
    }
}

const SubjectContextProvider = ({ children }) => {
    const [subjectState, dispatchSubject] = useReducer(subjectReducer, initialState);
    return (
        <Context.Provider value={[subjectState, dispatchSubject]}>
            {children}
        </Context.Provider>
    );
};

const useSubjectContext = () => {
    const [subjectState, dispatchSubject] = useContext(Context);
    return [subjectState, dispatchSubject];
}

export { useSubjectContext, SubjectContextProvider, initialState as SubjectInitialState };