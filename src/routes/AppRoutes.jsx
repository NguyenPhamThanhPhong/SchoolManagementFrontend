import Home from '../pages/Admin/Home/Home';
import Student from '../pages/Admin/Student/Student';
import Lecturer from '../pages/Admin/Lecturer/Lecturer';
import Subject from '../pages/Admin/Subject/Subject';
import Orther from '../pages/Admin/Other/Orther';
import Login from '../pages/Admin/Login/Login';
import Class from '../pages/Admin/Class/Class';
import Post from '../pages/Admin/Post/Post';
import SemesterFaculty from '../pages/Admin/SemesterFaculty/SemesterFaculty';
import User from '../pages/Admin/User/User';
import DetailClass from '../pages/Admin/Class/DetailClass';
import DetailStudent from '../pages/Admin/Student/DetailStudent';
import DetailLecturer from '../pages/Admin/Lecturer/DetailLecturer';

const publicRoutes = [
    { path: '/admin/', component: Home },

    { path: '/admin/student', component: Student },
    { path: '/admin/student/detail-student/:id', component: DetailStudent },

    { path: '/admin/lecturer', component: Lecturer },
    { path: '/admin/lecturer/detail-lecturer/:id', component: DetailLecturer },

    { path: '/admin/subject', component: Subject },

    { path: '/admin/class', component: Class },
    { path: '/admin/class/detail-class/:id', component: DetailClass },

    { path: '/admin/orther', component: Orther },
    { path: '/admin/post', component: Post },
    { path: '/admin/semester_faculty', component: SemesterFaculty },
    { path: '/admin/user', component: User },
];

const privateRoutes = [
    { path: '/admin/login', component: Login, layout: null },
    // { path: '/register', component: Register, layout: null }
];

export { publicRoutes, privateRoutes };
