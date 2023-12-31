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
import DetailLecturer from '../pages/Admin/Lecturer/DetailLecturer';

import UserHome from '../pages/user/Home/Home'
import CheckAttendance from '../pages/user/CheckAttendance/CheckAttendance'
import Classes from '../pages/user/Classes/Classes'
import ClassMaterialPage from '../pages/user/ClassMaterial/ClassMaterialPage';
import ExamSchedulePage from '../pages/user/ExamSchedulePage/ExamSchedulePage'
import RegisterSubject from '../pages/user/RegisterSubject/RegisterSubject'
import Schedule from '../pages/user/Schedule/Schedule'
import UserInfo from '../pages/user/User infor/UserInforPage'
import Notification from '../pages/user/Notification/Notification';
import NotificationContentPage from '../pages/user/NotificationContent/NotificationContentPage';
import InputScorePage from '../pages/user/InputScorePage/InputScorePage';
import AddMaterialPage from '../pages/user/AddMaterialPage/AddMaterialPage';
import ClassMaterialPageLecturerView from '../pages/user/ClassMaterial/Lectuer/ClassMaterialPageLecturerView';
import MyPage from '../pages/y-temp-page/my-page';
import MyTempComponent from '../pages/y-temp-page/my-temp-page';


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
    { path: '/admin/setting', component: Setting },
    { path: '/admin/post', component: Post },
    { path: '/admin/semester_faculty', component: SemesterFaculty },
    { path: '/admin/user', component: User },
];

const userRoutes = [
    { path: '/classes/lecturer/classid/check-attendance', component: CheckAttendance },
    { path: '/classes/lecturer/classid/inputscore', component: InputScorePage },
    { path: '/classes/lecturer/classid/addmaterial', component: AddMaterialPage },
    { path: '/classes/lecturer/classid', component: ClassMaterialPageLecturerView },

    { path: '/user-home', component: UserHome },

    { path: '/user-notification', component: Notification },
    { path: '/user-notification/notifi_ID', component: NotificationContentPage },

    { path: '/classes', component: Classes },
    { path: '/classes/student/classid', component: ClassMaterialPage },


    { path: '/student-exam-schedule', component: ExamSchedulePage },

    { path: '/student-schedule', component: Schedule },
    { path: '/student-user-info', component: UserInfo },

];

const privateRoutes = [
    { path: '/admin/login', component: Login, layout: null },
    { path: '/student-register-subject', component: RegisterSubject },
];

const myTestPages = [
    { path: '/my-page', component: MyPage },
    { path: '/my-temp-page', component: MyTempComponent },
]

export { publicRoutes, privateRoutes, userRoutes, myTestPages, paths };
