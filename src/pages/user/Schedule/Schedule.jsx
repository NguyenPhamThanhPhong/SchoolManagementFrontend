import ScheduleBoard from "../../../components/user/ScheduleBoard/ScheduleBoard";
import ExamSchedule from "../../../components/user/ExamSchedule/ExamSchedule";

import { Tabs } from 'antd';
import './Schedule.scss'
const onChange = (key) => {
  console.log(key);
};
let Semester = ["Semester 1 (2023-2024)", "Semester 2 (2023-2024)", "Semester summer (2023-2024)"]
const events = [
  {
    title: ' OOP',// để title như tên lớp
    daysOfWeek: ['4'],
    startTime: '8:00:00',
    endTime: '10:00:00',
    extendedProps: {
      classID: 'OOP1',
      dateStart: '20/11/2023',
      dateEnd: '20/12/2023'
    },
  },
  {
    title: ' OOP',// để title như tên lớp
    daysOfWeek: ['5'],
    startTime: '8:00:00',
    endTime: '10:00:00',
    extendedProps: {
      classID: 'OOP1',
      dateStart: '20/11/2023',
      dateEnd: '20/12/2023'
    },
  }
]
const items = [
  {
    key: '1',
    label: 'Schedule',
    children: <ScheduleBoard Semester={Semester} ScheduleEvents={events}></ScheduleBoard>,
  },
  {
    key: '2',
    label: 'Exam schedule',
    children: <ExamSchedule Semester={Semester}></ExamSchedule>,
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