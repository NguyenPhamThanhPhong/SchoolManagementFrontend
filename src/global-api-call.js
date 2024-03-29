import {
    useUserContext, useFacultyContext, useLecturerContext,
    useSchoolClassContext, useSemesterContext, useStudentContext, useSubjectContext,
    usePostContext,
    PostInitialState
} from "./data-store";

import { setFaculties, setLecturers, setSchoolClasses, setSemesters, setStudents, setSubjects, setUser, setLogin, setPosts, setLogout } from "./data-store/index";
import {
    FacultyInitialState, SemesterInitialState,
    lecturerIntialState, schoolClassInitialState,
    studentIntialState, SubjectInitialState, UserInitialState
} from "./data-store";
import { AdminApi, FacultyApi, lecturerApi, schoolClassApi, SemesterApi, StudentApi, subjectApi, PostApi } from "./data-api/index";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userPaths } from "./routes/AppRoutes";



const DataOnlyComponent = () => {


    const [user, userDispatch] = useUserContext();
    const [faculty, facultyDispatch] = useFacultyContext();
    const [lecturer, lecturerDispatch] = useLecturerContext();
    const [schoolClass, schoolClassDispatch] = useSchoolClassContext();
    const [semester, semesterDispatch] = useSemesterContext();
    const [student, studentDispatch] = useStudentContext();
    const [subject, subjectDispatch] = useSubjectContext();
    const [post, postDispatch] = usePostContext();
    const validLoginPath = ["/admin/login", "/student/login", "/lecturer/login"]


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
                if (!response.isError) {
                    userDispatch(setLogin({ user: response.data, isloggedIn: true, role: response.data?.role }));
                    return { isloggedIn: true, role: response.data?.role };
                }
                else
                    console.log(response.data)
            }
            catch (error) {
                console.log(error)
            }
            return { isloggedIn: false, role: null };
        }
    }

    async function fetchPosts() {
        try {
            let response = await PostApi.postGetManyRange(start, end);
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

    function fetchAdminDatas() {
        Promise.all([
            fetchFaculties(),
            fetchLecutrers(),
            fetchSchoolClasses(),
            fetchSemesters(),
            fetchStudents(),
            fetchsubjects(),
            fetchPosts()
        ])
    }

    const navigate = useNavigate();
    const pathname = window.location.pathname;

    function handleFirstLoadLogic() {
        fetchAutoLogin().then((state) => {
            if (state?.isloggedIn) {
                if (state?.role === "admin")
                    navigate("/admin")
                else if (state?.role === "student" || state?.role === "lecturer") {
                    navigate("/user-home")
                }
            }
            else {
                console.log('not logged in')
                if (validLoginPath.includes(item => item.toLowerCase().startsWith(pathname.toLowerCase()))) {
                    handleLogout()
                    return;
                }
                if (pathname.toLowerCase().startsWith("/admin"))
                    navigate("/admin/login")
                else if (pathname.toLowerCase().startsWith("/user-home") || pathname === "/")
                    navigate("/student/login")
                // navigate("/lecturer/login")
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    function handleLogout() {
        userDispatch(setLogout());
    }


    useEffect(() => {

    }, [user?.isloggedIn])


    useEffect(() => {
        handleFirstLoadLogic();
        fetchAdminDatas();
    }, [])

    return null;
}


export default DataOnlyComponent;