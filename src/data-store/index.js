import { UserContextProvider } from "./context-user"
import { FacultyContextProvider } from "./context-faculty"
import { SemesterContextProvider } from "./context-semester"
import { LecturerContextProvider } from "./context-lecturers"
import { SchoolClassContextProvider } from "./context-schoolclass"
import { StudentContextProvider } from "./context-students"
import { SubjectContextProvider } from "./context-subject"
import PostContextProvider from "./context-post"
import Student from "../pages/Admin/Student/Student"

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