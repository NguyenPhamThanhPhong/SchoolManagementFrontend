import { UserContextProvider } from "./context-user"
import { FacultyContextProvider } from "./context-faculty"
import { SemesterContextProvider } from "./context-semester"
import { LecturerContextProvider } from "./context-lecturers"
import { SchoolClassContextProvider } from "./context-schoolclass"
import { StudentContextProvider } from "./context-students"
import { SubjectContextProvider } from "./context-subject"
import PostContextProvider from "./context-post"
import Student from "../pages/Admin/Student/Student"
import { setLogout } from "./actions"

export * from "./context-faculty";
export * from "./context-lecturers"
export * from "./context-schoolclass";
export * from "./context-semester";
export * from "./context-students";
export * from "./context-subject";
export * from "./context-user";
export * from "./context-post";

export * from "./constants"
export * from "./actions";

export function removeCookie(key) {
    const expires = new Date();
    expires.setTime(expires.getTime() - 1); // Set expiration to the past

    // Set the cookie with the same key and an expired date
    document.cookie = `${key}=;expires=${expires.toUTCString()};path=/`;
}

export const executeLogout = ([userstate, userDispatch], role, navigate) => {
    removeCookie("access_token")
    userDispatch(setLogout())
    if (role.toLowerCase() === 'admin')
        navigate("/admin/login");
    else if (role.toLowerCase() === 'student')
        navigate("/student/login");
    else
        navigate("/lecturer/login");
}




export const DataStoreProvider = ({ children }) => {
    return (
        <UserContextProvider>
            <SubjectContextProvider>
                <SchoolClassContextProvider>
                    <StudentContextProvider>
                        <LecturerContextProvider>
                            <FacultyContextProvider>
                                <SemesterContextProvider>
                                    <PostContextProvider>
                                        {children}
                                    </PostContextProvider>
                                </SemesterContextProvider>
                            </FacultyContextProvider>
                        </LecturerContextProvider>
                    </StudentContextProvider>
                </SchoolClassContextProvider>
            </SubjectContextProvider>
        </UserContextProvider>
    )
}