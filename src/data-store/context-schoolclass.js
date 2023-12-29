import React, { createContext, useReducer, useContext } from 'react';
import { SET_SCHOOLCLASSES, SET_CURRENT_SCHOOLCLASS, APPEND_SCHOOLCLASS, REMOVE_SCHOOLCLASS } from './constants';

const Context = createContext();


const initialState = {
    schoolClasses: [],
    currentSchoolClass: null
}

const schoolClassReducer = (state, action) => {
    switch (action.type) {
        case SET_SCHOOLCLASSES:
            return { ...state, schoolClasses: action.payload };
        case SET_CURRENT_SCHOOLCLASS:
            return { ...state, currentSchoolClass: action.payload };
        case APPEND_SCHOOLCLASS:
            return { ...state, schoolClasses: [...state.schoolClasses, action.payload] };
        case REMOVE_SCHOOLCLASS:
            return {
                ...state,
                schoolClasses: state.schoolClasses.filter(schoolClass => schoolClass.id !== action.payload)
            };
        default:
            return state;
    }
};


const SchoolClassContextProvider = ({ children }) => {
    const [schoolClassState, dispatchSchoolClass] = useReducer(schoolClassReducer, initialState);
    return (
        <Context.Provider value={[schoolClassState, dispatchSchoolClass]}>
            {children}
        </Context.Provider>
    );
}

const useSchoolClassContext = () => {
    const [schoolClassState, dispatchSchoolClass] = useContext(Context);
    return [schoolClassState, dispatchSchoolClass];
}

export { useSchoolClassContext, SchoolClassContextProvider, initialState as schoolClassInitialState };

export default SchoolClassContextProvider;