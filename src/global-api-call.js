import {
    useUserContext, useFacultyContext, useLecturerContext,
    useSchoolClassContext, useSemesterContext, useStudentContext, useSubjectContext, setLogin
} from "./data-store";

import { setFaculties, setLecturers, setSchoolClasses, setSemesters, setStudents, setSubjects, setUser } from "./data-store/index";
import {
    FacultyInitialState, SemesterInitialState,
    lecturerIntialState, schoolClassInitialState,
    studentIntialState, SubjectInitialState, UserInitialState
} from "./data-store";
import { AdminApi, FacultyApi, lecturerApi, schoolClassApi, SemesterApi, StudentApi, subjectApi } from "./data-api/index";
import { useEffect } from "react";



const DataOnlyComponent = () => {


    const [user, userDispatch] = useUserContext();
    const [faculty, facultyDispatch] = useFacultyContext();
    const [lecturer, lecturerDispatch] = useLecturerContext();
    const [schoolClass, schoolClassDispatch] = useSchoolClassContext();
    const [semester, semesterDispatch] = useSemesterContext();
    const [student, studentDispatch] = useStudentContext();
    const [subject, subjectDispatch] = useSubjectContext();

    let start = 0;
    let end = 1000;

    const fetchLecutrers = async (start, end) => {
        if (lecturer === lecturerIntialState) {
            try {
                let response = await lecturerApi.getManyRange(start, end)
                if (!response.isError) {
                    lecturerDispatch(setLecturers(response.data.data));
                }
                else
                    console.log(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }
    }
    const fetchStudents = async (start, end) => {
        if (student === studentIntialState) {
            try {
                let response = await StudentApi.getManyRange(start, end)
                if (!response.isError) {
                    studentDispatch(setStudents(response.data.data));
                }
                else
                    console.log(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }
    }
    const fetchFaculties = async () => {
        if (faculty === FacultyInitialState) {
            try {
                let response = await FacultyApi.getAll()
                if (!response.isError) {
                    facultyDispatch(setFaculties(response.data.data));
                }
                else
                    console.log(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }
    }
    const fetchSchoolClasses = async (start, end) => {
        if (schoolClass === schoolClassInitialState) {
            try {
                let response = await schoolClassApi.getManyRange(start, end)
                if (!response.isError) {
                    schoolClassDispatch(setSchoolClasses(response.data.data));
                }
                else
                    console.log(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }

    }
    const fetchsubjects = async () => {
        console.log(`in fetching subject ${subject === SubjectInitialState}`)
        if (subject === SubjectInitialState) {
            try {
                let response = await subjectApi.subjectManyRange(start, end)
                if (!response.isError) {
                    subjectDispatch(setSubjects(response.data.data));
                }
                else
                    console.log(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    const fetchSemesters = async () => {
        if (semester === SemesterInitialState) {
            try {
                let response = await SemesterApi.getAll()
                if (!response.isError) {
                    semesterDispatch(setSemesters(response.data.data));
                }
                else
                    console.log(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    async function fetchAutoLogin() {
        if (user === UserInitialState) {
            try {
                let response = await AdminApi.getAutoLogin();
                if (!response.isError) {
                    userDispatch(setLogin({ user: response?.data?.data, isloggedIn: true, role: response?.data?.data?.role }));
                }
                else
                    console.log(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }
    }


    async function fetchAdminDatas() {
        console.log('executing global q23412341234api call')
        await Promise.all([
            fetchFaculties(),
            fetchSchoolClasses(),
            fetchSemesters(),
            fetchStudents(),
            fetchsubjects()
        ])
    }
    async function handleFirstLoadLogic() {
        // await fetchAutoLogin();
        await fetchAdminDatas();
    }


    useEffect(() => {
        console.log('executing global api call')
        handleFirstLoadLogic();

    }, [])

    return null;
}

export default DataOnlyComponent;