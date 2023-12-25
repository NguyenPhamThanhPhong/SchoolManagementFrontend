import React, { createContext, useReducer } from 'react';

// Define the initial state for lecturers
const initialLecturersState = [];

// Define the reducer function for managing the state of lecturers
const lecturersReducer = (state, action) => {
    switch (action.type) {
        // Add cases for different actions related to lecturers
        case 'ADD_LECTURER':
            return [...state, action.payload];
        case 'REMOVE_LECTURER':
            return state.filter(lecturer => lecturer.id !== action.payload);
        default:
            return state;
    }
};

// Create a new context for lecturers
export const LecturersContext = createContext();

// Create a LecturersProvider component
export const LecturersProvider = ({ children }) => {
    // Use the useReducer hook to manage the state of lecturers
    const [lecturers, dispatch] = useReducer(lecturersReducer, initialLecturersState);

    // Add any additional state or functions related to lecturers here

    // Return the provider with the lecturers state, dispatch function, and any other necessary values
    return (
        <LecturersContext.Provider value={{ lecturers, dispatch }}>
            {children}
        </LecturersContext.Provider>
    );
};
