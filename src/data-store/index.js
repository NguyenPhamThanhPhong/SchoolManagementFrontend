import { UserContextProvider } from "./context-user"
import { FacultyContextProvider } from "./context-faculty"
import { SemesterContextProvider } from "./context-semester"
export * from "./context-faculty";
export * from "./context-lecturers"
export * from "./context-schoolclass";
export * from "./context-semester";
export * from "./context-students";
export * from "./context-subject";
export * from "./context-user";

export * from "./constants"
export * from "./actions";


export const DataStoreProvider = ({ children }) => {
    return (
        <UserContextProvider>
            <FacultyContextProvider>
                <SemesterContextProvider>
                    {children}
                </SemesterContextProvider>
            </FacultyContextProvider>
        </UserContextProvider>
    )
}