import * as types from './constants'

export const setUser = payload => ({
    type: types.SET_USER,
    payload
})
export const setLogin = payload => ({
    type: types.SET_LOGIN,
    payload
})

export const setFaculties = (payload) => ({
    type: types.SET_FACULTIES,
    payload
})

export const setCurrentFaculty = (payload) => ({
    type: types.SET_CURRENT_FACULTY,
    payload
})

export const setSemesters = (payload) => ({
    type: types.SET_SEMESTERS,
    payload
})

export const setCurrentSemester = (payload) => ({
    type: types.SET_CURRENT_SEMESTER,
    payload
})


export const setLecturers = (payload) => ({
    type: types.SET_LECTURERS,
    payload
})

export const setPosts = (payload) => ({
    type: types.SET_POST,
    payload
})


