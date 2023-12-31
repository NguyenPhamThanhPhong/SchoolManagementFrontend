import ScheduleBoard from "../../../components/user/ScheduleBoard/ScheduleBoard";
import ExamSchedule from "../../../components/user/ExamSchedule/ExamSchedule";

import { Tabs } from 'antd';
import './Schedule.scss'
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'Schedule',
    children: <ScheduleBoard></ScheduleBoard>,
  },
  {
    key: '2',
    label: 'Exam schedule',
    children: <ExamSchedule></ExamSchedule>,
  },
];
function Schedule() {
  const userState = {
    user: {},
    role: 'student',
    isLoggedin: true,
  }
  if (userState.role === 'lecturer') {
    return (
      <>
        <div className="MainScreenSchedule">
          <ScheduleBoard></ScheduleBoard>
        </div>
      </>
    );
  }
  else {
    return (
      <>
        <div className="MainScreenSchedule">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </>
    );
  }

}

export default Schedule;