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

function removeCookie(key) {
    const expires = new Date();
    expires.setTime(expires.getTime() - 1); // Set expiration to the past

    // Set the cookie with the same key and an expired date
    document.cookie = `${key}=;expires=${expires.toUTCString()};path=/`;
}

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
                    return true;
                }
                else
                    console.log(response.data)
            }
            catch (error) {
                console.log(error)
            }
            return false;
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

    const navigate = useNavigate();
    const pathname = window.location.pathname;

    async function handleFirstLoadLogic() {
        let isSuccess = await fetchAutoLogin();
        if (isSuccess) {
            if (user?.role === "admin")
                navigate("/admin")
            else
                navigate("/user-home")
        }
        else {
            if (validLoginPath.includes(pathname)) {
                handleLogout()
                return;
            }
            if (pathname.toLowerCase().startsWith("/admin"))
                navigate("/admin/login")
            else if (pathname.toLowerCase().startsWith("/user-home") || pathname === "/")
                navigate("/student/login")
            handleLogout();
        }
    }
    function handleLogout() {
        userDispatch(setLogout());
    }

    // function setLogoutState() {
    //     console.log('removing token')
    //     removeCookie("token");
    //     facultyDispatch(FacultyInitialState);
    //     lecturerDispatch(lecturerIntialState);
    //     schoolClassDispatch(schoolClassInitialState);
    //     semesterDispatch(SemesterInitialState);
    //     studentDispatch(studentIntialState);
    //     subjectDispatch(SubjectInitialState);
    //     postDispatch(PostInitialState);
    // }

    useEffect(() => {
        if (user?.isloggedIn)
            fetchAdminDatas();
    }, [user?.isloggedIn])


    useEffect(() => {
        handleFirstLoadLogic();
    }, [])

    return null;
}


export default DataOnlyComponent;