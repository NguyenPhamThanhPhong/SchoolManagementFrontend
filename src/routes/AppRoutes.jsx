import Home from '../pages/Admin/Home/Home';
import Student from '../pages/Admin/Student/Student';
import Lecturer from '../pages/Admin/Lecturer/Lecturer';
import Subject from '../pages/Admin/Subject/Subject';
import Orther from '../pages/Admin/Other/Orther';
import Registration from '../pages/Admin/Registration/Registration';
import Login from '../pages/Admin/Login/Login';
import Class from '../pages/Admin/Class/Class';
import Post from '../pages/Admin/Post/Post';
import SemesterFaculty from '../pages/Admin/SemesterFaculty/SemesterFaculty';
import User from '../pages/Admin/User/User';
import DetailClass from '../pages/Admin/Class/DetailClass';
import DetailStudent from '../pages/Admin/Student/DetailStudent';
import DetailLecturer from '../pages/Admin/Lecturer/DetailLecturer';

import UserHome from '../pages/user/Home/Home'

import Classes from '../pages/user/Classes/Classes'
import ClassMaterialPage from '../pages/user/ClassMaterial/ClassMaterialPage';

import RegisterSubject from '../pages/user/RegisterSubject/RegisterSubject'
import Schedule from '../pages/user/Schedule/Schedule'
import UserInfo from '../pages/user/User infor/UserInforPage'

import NotificationContentPage from '../pages/user/NotificationContent/NotificationContentPage';

import AddMaterialPage from '../pages/user/AddMaterialPage/AddMaterialPage';
import ClassMaterialPageLecturerView from '../pages/user/ClassMaterial/Lectuer/ClassMaterialPageLecturerView';
import MyPage from '../pages/y-temp-page/my-page';
import MyTempComponent from '../pages/y-temp-page/my-temp-page';

import LoginUser from '../pages/user/Login/LoginUser';

const paths = {
    admin_student: '/admin/student',
    admin_lecturer: '/admin/lecturer',
    admin_subject: '/admin/subject',
    admin_orther: '/admin/orther',
}

const publicRoutes = [
    { path: '/admin', component: Home },

    { path: '/admin/student', component: Student },
    { path: '/admin/student/detail-student/:id', component: DetailStudent },

    { path: '/admin/lecturer', component: Lecturer },
    { path: '/admin/lecturer/detail-lecturer/:id', component: DetailLecturer },

    { path: '/admin/subject', component: Subject },

    { path: '/admin/class', component: Class },
    { path: '/admin/class/detail-class/:id', component: DetailClass },

    { path: '/admin/orther', component: Orther },
    { path: '/admin/registration', component: Registration },
    { path: '/admin/post', component: Post },
    { path: '/admin/semester_faculty', component: SemesterFaculty },
    { path: '/admin/user', component: User },
];


const userPaths =
{
    studentLogin: '/student/login',
    lecutrerLogin: '/lecturer/login',

    home: '/user-home',
    notification: '/user-home/notification/:id',
    user_infor: '/student-user-info',
    schedule: '/schedule',
    classes: '/classes',
    lecturerViewClass: '/classes/lecturer',
    lecutrerAddFile: '/classes/lecturer/add',
    studentViewClass: '/classes/student/:id',
    studentRegister: '/student-register-subject'
}

const userRoutes = [
    { path: userPaths.home, component: UserHome },
    { path: userPaths.notification, component: NotificationContentPage },

    { path: userPaths.classes, component: Classes },
    { path: userPaths.studentViewClass, component: ClassMaterialPage },
    { path: userPaths.lecutrerAddFile, component: AddMaterialPage },
    { path: userPaths.lecturerViewClass, component: ClassMaterialPageLecturerView },

    { path: userPaths.schedule, component: Schedule },

    { path: userPaths.user_infor, component: UserInfo },

    { path: userPaths.studentRegister, component: RegisterSubject }

];

const privateRoutes = [
    { path: '/admin/login', component: Login, layout: null },
    { path: userPaths.studentLogin, component: LoginUser, layout: null },
    { path: userPaths.lecutrerLogin, component: LoginUser, layout: null },
];

const myTestPages = [
    { path: '/my-page', component: MyPage },
    { path: '/my-temp-page', component: MyTempComponent },
]


export { publicRoutes, privateRoutes, userRoutes, userPaths };
