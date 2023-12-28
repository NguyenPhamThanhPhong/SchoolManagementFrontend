import React, { createContext, useReducer, useContext } from 'react';
import { SET_STUDENTS, SET_CURRENT_STUDENT, APPEND_STUDENT } from './constants';

const StudentContext = createContext();

const studentInitialState = {
    students: [],
    currentStudent: null
};

const studentReducer = (state, action) => {
    switch (action.type) {
        case SET_STUDENTS:
            return { ...state, students: action.payload };
        case SET_CURRENT_STUDENT:
            return {
                ...state,
                currentStudent: action.payload // Assuming you want to set currentLecturer to null when removing a lecturer
            };
        case APPEND_STUDENT:
            return {
                ...state,
                students: [...state.students, action.payload],
                currentstudent: null
            }
        default:
            return state;
    }
};

const StudentContextProvider = ({ children }) => {
    const [studentState, dispatchStudent] = useReducer(studentReducer, studentInitialState);
    return (
        <StudentContext.Provider value={[studentState, dispatchStudent]}>
            {children}
        </StudentContext.Provider>
    );
};

const useStudentContext = () => {
    const [studentState, dispatchStudent] = useContext(StudentContext);
    return [studentState, dispatchStudent];
}


export { useStudentContext, StudentContextProvider, studentInitialState as studentIntialState };
