import ScheduleBoard from "../../../components/user/ScheduleBoard/ScheduleBoard";
import ExamSchedule from "../../../components/user/ExamSchedule/ExamSchedule";

import { Tabs } from 'antd';
import './Schedule.scss'
const onChange = (key) => {
  console.log(key);
};
//
let SemesterSchedule = ["Semester 1 (2023-2024)", "Semester 2 (2023-2024)", "Semester summer (2023-2024)"]
let SemesterExamSchedule = ["Semester 1 (2023-2024)", "Semester 2 (2023-2024)", "Semester summer (2023-2024)"]


function Schedule() {

  const scheduleAggregation = {
    "Semester 1 (2023-2024)":
      [
        {
          id: 'SE001',
          name: "OOP",
          DateOfWeek: 3,
          startTime: "8:00",
          endTime: "10:00",
          beginTime: "20/11/2023",
          endTime: "20/12/2023",
        },
        {
          id: "SE002",
          name: "SE002",
          DateOfWeek: 3,
          startTime: "8:00",
          endTime: "10:00",
          beginTime: "20/11/2023",
          endTime: "20/12/2023",
        }
      ]
  }

  let datas = []


  for (let [semester, schedule] of Object.entries(scheduleAggregation)) {

  }

  const events = [
    {
      title: '',// để title như tên lớp
      daysOfWeek: '4',
      startTime: '8:00:00',
      endTime: '10:00:00',
      extendedProps: {
        classID: 'OOP1',
        dateStart: '20/11/2023',
        dateEnd: '20/12/2023'
      },
    },
    {
      title: ' ',// để title như tên lớp
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
  const ExamData = [
    {
      key: 1,
      No_: '1',
      subject_id: 'OOP.1',
      class_id: 'OOP.PMCL',
      room: 'C108',
      exam_date: '1/1/2024',
      exam_form: 'Paper',
      note: '',
    },
    {
      key: 2,
      No_: '2',
      subject_id: 'OOP.1',
      class_id: 'OOP.PMCL',
      room: 'C108',
      exam_date: '1/1/2024',
      exam_form: 'Paper',
      note: '',
    },
    {
      key: 3,
      No_: '3',
      subject_id: 'OOP.1',
      class_id: 'OOP.PMCL',
      room: 'C108',
      exam_date: '1/1/2024',
      exam_form: 'Paper',
      note: '',
    }
  ]
  const items = [
    {
      key: '1',
      label: 'Schedule',
      children: <ScheduleBoard Semester={SemesterSchedule} ScheduleEvents={events}></ScheduleBoard>,
    },
    {
      key: '2',
      label: 'Exam schedule',
      children: <ExamSchedule Semester={SemesterExamSchedule} ExamData={ExamData}></ExamSchedule>,
    },
  ];

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