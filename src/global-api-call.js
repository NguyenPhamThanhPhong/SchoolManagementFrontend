import {
    useUserContext, useFacultyContext, useLecturerContext,
    useSchoolClassContext, useSemesterContext, useStudentContext, useSubjectContext,
    usePostContext
} from "./data-store";

import { setFaculties, setLecturers, setSchoolClasses, setSemesters, setStudents, setSubjects, setUser, setLogin, setPosts } from "./data-store/index";
import {
    FacultyInitialState, SemesterInitialState,
    lecturerIntialState, schoolClassInitialState,
    studentIntialState, SubjectInitialState, UserInitialState
} from "./data-store";
import { AdminApi, FacultyApi, lecturerApi, schoolClassApi, SemesterApi, StudentApi, subjectApi, PostApi } from "./data-api/index";
import { useEffect } from "react";



const DataOnlyComponent = () => {


    const [user, userDispatch] = useUserContext();
    const [faculty, facultyDispatch] = useFacultyContext();
    const [lecturer, lecturerDispatch] = useLecturerContext();
    const [schoolClass, schoolClassDispatch] = useSchoolClassContext();
    const [semester, semesterDispatch] = useSemesterContext();
    const [student, studentDispatch] = useStudentContext();
    const [subject, subjectDispatch] = useSubjectContext();
    const [post, postDispatch] = usePostContext();

    let start = 0;
    let end = 1000;

    const fetchLecutrers = async () => {
        if (lecturer === lecturerIntialState) {
            try {
                let response = await lecturerApi.getManyRange(0, 1000)
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
    const fetchStudents = async () => {
        if (student === studentIntialState) {
            try {
                let response = await StudentApi.studentGetManyRange(0, 1000)
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
    const fetchSchoolClasses = async () => {
        if (schoolClass === schoolClassInitialState) {
            try {
                let response = await schoolClassApi.classGetManyRange(0, 1000)
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
                let response = await subjectApi.subjectManyRange(0, 1000)
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
                console.log(response)
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

    async function fetchPosts() {
        try {
            let response = await PostApi.postGetManyRange(start, end);
            console.log(response)
            if (!response.isError) {
                postDispatch(setPosts(response?.data?.data));
            }
            else
                console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }


    async function fetchAdminDatas() {

        await Promise.all([
            fetchFaculties(),
            fetchLecutrers(),
            fetchSchoolClasses(),
            fetchSemesters(),
            fetchStudents(),
            fetchsubjects(),
            fetchPosts()
        ])
    }
    async function handleFirstLoadLogic() {
        await fetchAutoLogin();
        await fetchAdminDatas();
    }


    useEffect(() => {
        handleFirstLoadLogic();

    }, [])

    return null;
}

export default DataOnlyComponent;