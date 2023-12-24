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
import DetailClass from '../pages/Admin/Class/DetailClass';
import DetailStudent from '../pages/Admin/Student/DetailStudent';
import ScheduleStudent from '../pages/Admin/Student/ScheduleStudent';

import UserHome from '../pages/user/Home/Home'
import CheckAttendance from '../pages/user/CheckAttendance/CheckAttendance'
import Classes from '../pages/user/Classes/Classes'
import ExamSchedulePage from '../pages/user/ExamSchedulePage/ExamSchedulePage'
import RegisterSubject from '../pages/user/RegisterSubject/RegisterSubject'
import Schedule from '../pages/user/Schedule/Schedule'
import UserInfo from '../pages/user/User infor/UserInforPage'

import MyPage from '../pages/y-temp-page/my-page';

const publicRoutes = [
    { path: '/admin', component: Home },

    { path: '/admin/student', component: Student },
    { path: '/admin/student/detail-student/:id', component: DetailStudent },
    { path: '/admin/student/schedule', component: ScheduleStudent },

    { path: '/admin/lecturer', component: Lecturer },
    { path: '/admin/subject', component: Subject },

    { path: '/admin/class', component: Class },
    { path: '/admin/class/detail-class/:id', component: DetailClass },

    { path: '/admin/orther', component: Orther },
    { path: '/admin/setting', component: Setting },
    { path: '/admin/post', component: Post },
    { path: '/admin/semester_faculty', component: SemesterFaculty },
    { path: '/admin/user', component: User },
];

const userRoutes = [
    { path: '/student/check-attendance', component: CheckAttendance },
    { path: '/student-classes', component: Classes },
    { path: '/student-exam-schedule', component: ExamSchedulePage },
    { path: '/student-register-subject', component: RegisterSubject },
    { path: '/student-schedule', component: Schedule },
    { path: '/student-user-info', component: UserInfo },
];

const privateRoutes = [
    { path: '/admin/login', component: Login, layout: null },
];

const myTestPages = [
    { path: '/my-page', component: MyPage },
]

export { publicRoutes, privateRoutes, userRoutes, myTestPages };
