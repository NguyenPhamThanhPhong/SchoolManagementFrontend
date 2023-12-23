
import Home from '../../pages/user/Home/Home';
import Classes from '../../pages/user/Classes/Classes';
import Login from '../../pages/user/Login/Login';
import UserInforPage from '../../pages/user/User infor/UserInforPage';
import ClassMaterialPage from '../../pages/user/ClassMaterial/ClassMaterialPage';
import RegisterSubject from '../../pages/user/RegisterSubject/RegisterSubject';
import Schedule from '../../pages/user/Schedule/Schedule';
import CheckAttendance from '../../pages/user/CheckAttendance/CheckAttendance';
import ExamSchedulePage from '../../pages/user/ExamSchedulePage/ExamSchedulePage';
const publicRoutes = [
    {path: '/', component: Home},
    {path: '/Classes', component: Classes},
    {path: '/User', component: UserInforPage},
    {path: '/Classes/ClassId', component: ClassMaterialPage},
    {path: '/Classes/Attendance', component: CheckAttendance},
    {path: '/Notification', component: ClassMaterialPage},
    {path: '/Schedule', component: Schedule},
    {path: '/Schedule/ExamSchedule', component: ExamSchedulePage},
    
    //{path: '/', component: Home}
]

const privateRoutes = [
    {path: '/Login', component: Login, layout: null},
    {path: '/Register', component: RegisterSubject, layout: null}
]
export {publicRoutes, privateRoutes}