import React, { createContext, useReducer } from 'react';
import { SET_SCHOOLCLASSES, SET_CURRENT_SCHOOLCLASS } from './constants';

const initialState = {
    schoolClasses: [],
    currentSchoolClass: null
}

const schoolClassReducer = (state, action) => {
    switch (action.type) {
        case SET_SCHOOLCLASSES:
            return [...state, action.payload];
        case SET_CURRENT_SCHOOLCLASS:
            return state.filter(schoolClass => schoolClass.id !== action.payload);
        default:
            return state;
    }
};
