// Import the action types
import * as types from './constants';

export const setUser = (payload) => ({
    type: types.SET_USER,
    payload
});

export const setLogin = (payload) => ({
    type: types.SET_LOGIN,
    payload
});

export const setLogout = (payload = null) => ({
    type: types.SET_LOGOUT,
    payload
});

// Action creators for faculties
export const setFaculties = (payload) => ({
    type: types.SET_FACULTIES,
    payload
});

export const setCurrentFaculty = (payload) => ({
    type: types.SET_CURRENT_FACULTY,
    payload
});

export const appendFaculty = (payload) => ({
    type: types.APPEND_FACULTY,
    payload
});

export const removeFaculty = (payload) => ({
    type: types.REMOVE_FACULTY,
    payload
});

// Action creators for semesters
export const setSemesters = (payload) => ({
    type: types.SET_SEMESTERS,
    payload
});

export const setCurrentSemester = (payload) => ({
    type: types.SET_CURRENT_SEMESTER,
    payload
});

export const appendSemester = (payload) => ({
    type: types.APPEND_SEMESTER,
    payload
});

export const removeSemester = (payload) => ({
    type: types.REMOVE_SEMESTER,
    payload
});

// Action creators for lecturers
export const setLecturers = (payload) => ({
    type: types.SET_LECTURERS,
    payload
});

export const setCurrentLecturer = (payload) => ({
    type: types.SET_CURRENT_LECTURER,
    payload
});

export const appendLecturer = (payload) => ({
    type: types.APPEND_LECTURER,
    payload
});

export const removeLecturer = (payload) => ({
    type: types.REMOVE_LECTURER,
    payload
});

// Action creators for students
export const setStudents = (payload) => ({
    type: types.SET_STUDENTS,
    payload
});

export const setCurrentStudent = (payload) => ({
    type: types.SET_CURRENT_STUDENT,
    payload
});

export const appendStudent = (payload) => ({
    type: types.APPEND_STUDENT,
    payload
});

export const removeStudent = (payload) => ({
    type: types.REMOVE_STUDENT,
    payload
});

// Action creators for subjects
export const setSubjects = (payload) => ({
    type: types.SET_SUBJECTS,
    payload
});

export const setCurrentSubject = (payload) => ({
    type: types.SET_CURRENT_SUBJECT,
    payload
});

export const appendSubject = (payload) => ({
    type: types.APPEND_SUBJECT,
    payload
});

export const removeSubject = (payload) => ({
    type: types.REMOVE_SUBJECT,
    payload
});

// Action creators for school classes
export const setSchoolClasses = (payload) => ({
    type: types.SET_SCHOOLCLASSES,
    payload
});

export const setCurrentSchoolClass = (payload) => ({
    type: types.SET_CURRENT_SCHOOLCLASS,
    payload
});

export const appendSchoolClass = (payload) => ({
    type: types.APPEND_SCHOOLCLASS,
    payload
});

export const removeSchoolClass = (payload) => ({
    type: types.REMOVE_SCHOOLCLASS,
    payload
});

// Action creators for posts
export const setPosts = (payload) => ({
    type: types.SET_POSTS,
    payload
});

export const setCurrentPost = (payload) => ({
    type: types.SET_CURRENT_POST,
    payload
});

export const appendPost = (payload) => ({
    type: types.APPEND_POST,
    payload
});

export const removePost = (payload) => ({
    type: types.REMOVE_POST,
    payload
});
