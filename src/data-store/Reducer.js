import { SET_LOGIN, SET_USER } from "./constants"

const UserInitialState = {
    user: null,
    isloggedIn: false,
    role: null,
    semester: [],
    faculty: [],
    subjects: [],
    schoolClasses: [],
    lecturers: [],
    students: [],
    currentStudent: null,
    currentLecturer: null,
    currentSubject: null
}



function Reducer(state, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload.user,
                isloggedIn: action.payload.isloggedIn,
                role: action.payload.role,
            }
        case SET_LOGIN:
            return {
                ...state,
                isloggedIn: action.payload.isloggedIn,
            }
        case SET_SUBJECTS:
            return {
                ...state,
                Subjects: action.payload.Subjects,
            }
    }
}