import React, { createContext, useReducer, useContext } from 'react';
import { SET_LECTURERS, SET_CURRENT_LECTURER, APPEND_LECTURER } from './constants';

const LecturerContext = createContext();

const lecturerInitialState = {
    lecturers: [],
    currentLecturer: null
};

const lecturerReducer = (state, action) => {
    switch (action.type) {
        case SET_LECTURERS:
            return { ...state, lecturers: action.payload };
        case SET_CURRENT_LECTURER:
            return {
                ...state,
                currentLecturer: action.payload // Assuming you want to set currentLecturer to null when removing a lecturer
            };
        case APPEND_LECTURER:
            return {
                ...state,
                lecturers: [...state.lecturers, ...action.payload],
                currentLecturer: null
            }
        default:
            return state;
    }
};

const LecturerContextProvider = ({ children }) => {
    const [lecturerState, dispatchLecturer] = useReducer(lecturerReducer, lecturerInitialState);
    return (
        <LecturerContext.Provider value={[lecturerState, dispatchLecturer]}>
            {children}
        </LecturerContext.Provider>
    );
};

const useLecturerContext = () => {
    const [lecturerState, dispatchLecturer] = useContext(LecturerContext);
    return [lecturerState, dispatchLecturer];
}

export { useLecturerContext, LecturerContextProvider, lecturerInitialState as lecturerIntialState };
