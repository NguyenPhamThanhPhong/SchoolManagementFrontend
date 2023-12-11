import Home from '../pages/Admin/Home/Home';
import Student from '../pages/Admin/Student/Student';
import Lecturer from '../pages/Admin/Lecturer/Lecturer';
import Subject from '../pages/Admin/Subject/Subject';
import Orther from '../pages/Admin/Other/Orther';
import Setting from '../pages/Admin/Setting/Setting';
import Login from '../pages/Admin/Login/Login';
import Class from '../pages/Admin/Class/Class';
import Post from '../pages/Admin/Post/Post';
import SemesterFaculty from '../pages/Admin/SemesterFaculty/SemesterFaculty';
import User from '../pages/Admin/User/User';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/student', component: Student },
    { path: '/lecturer', component: Lecturer },
    { path: '/subject', component: Subject },
    { path: '/class', component: Class },
    { path: '/orther', component: Orther },
    { path: '/setting', component: Setting },
    { path: '/post', component: Post },
    { path: '/semester_faculty', component: SemesterFaculty },
    { path: '/user', component: User },
];

const privateRoutes = [
    { path: '/login', component: Login, layout: null },
    // { path: '/register', component: Register, layout: null }
];

export { publicRoutes, privateRoutes };
