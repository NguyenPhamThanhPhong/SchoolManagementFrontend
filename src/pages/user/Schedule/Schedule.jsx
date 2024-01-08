import ScheduleBoard from "../../../components/user/ScheduleBoard/ScheduleBoard";
import ExamSchedule from "../../../components/user/ExamSchedule/ExamSchedule";

import { Tabs } from 'antd';
import './Schedule.scss'
import { useState, useEffect } from 'react';

import { useUserContext, useSchoolClassContext, useSemesterContext } from '../../../data-store';


const onChange = (key) => {
  console.log(key);
};
//
let SemesterSchedule = ["Semester 1 (2023-2024)", "Semester 2 (2023-2024)", "Semester summer (2023-2024)"]
let SemesterExamSchedule = ["Semester 1 (2023-2024)", "Semester 2 (2023-2024)", "Semester summer (2023-2024)"]


function Schedule() {

  const [userState, userDispatch] = useUserContext();
  const [schoolClassState, schoolClassDispatch] = useSchoolClassContext();
  const [semesterState, semesterDispatch] = useSemesterContext();


  const [schoolClasses, setSchoolClasses] = useState(schoolClassState?.schoolClasses || []);
  const [schedule, setSchedule] = useState(schoolClassState?.schoolClasses || []);
  const [examSchedule, setExamSchedule] = useState([]);

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

  function getScheduleBySemester(semesterId) {
    let filtredSchoolClasses = schoolClasses.filter(item => item.semesterId === semesterId);
    let filteredSchedule = filtredSchoolClasses.map(
      (item) => {
        console.log(JSON.stringify(item));
        let schedule = {
          id: item.id,
          name: item.name,
          daysOfWeek: item.schedule?.dateofweek + '',
          startTime: item.schedule?.startTime,
          endTime: item.schedule?.endTime,
          extendsProps: {
            classID: 'OOP1',
            beginTime: item.schedule?.beginTime,
            endTime: item?.schedule?.finalTime,
          }
        }
        return schedule;
      }
    )
    setSchedule(filteredSchedule);
  }

  function getExamBySemester(semesterId) {
    let filtredSchoolClasses = schoolClasses.filter(item => item.semesterId === semesterId);
    let examRows = [];
    for (const schoolClass of filtredSchoolClasses) {
      if (schoolClass) {
        for (const exam of schoolClass.exams) {
          if (exam) {
            examRows.push({
              index: examRows.length + 1,
              subjectId: schoolClass?.subject?.id || '',
              classId: schoolClass?.id || '',
              room: exam?.room || '',
              examDate: exam?.startTime || '',
              duration: exam?.duration || '',
              examName: exam?.name || '',
            })
          }
        }
      }
    }
  }


  const events = [
    {
      title: 'zxcvzxc',// để title như tên lớp
      daysOfWeek: '4',
      startTime: '8:00:00',
      endTime: '10:00:00',
      extendedProps: {
        id: 'OOP1',
        beginTime: '20/11/2023',
        finalTime: '20/12/2023'
      },
    },
    {
      title: ' sdfasdf',// để title như tên lớp
      daysOfWeek: ['5'],
      startTime: '8:00:00',
      endTime: '10:00:00',
      extendedProps: {
        id: 'OOP1',
        beginTime: '20/11/2023',
        finalTime: '20/12/2023'
      },
    }
  ]

  const items = [
    {
      key: '1',
      label: 'Schedule',
      children: <ScheduleBoard semesters={semesterState?.semesters} ScheduleEvents={schedule}
        onSemesterChange={getScheduleBySemester}></ScheduleBoard>,
    },
    {
      key: '2',
      label: 'Exam schedule',
      children: <ExamSchedule semesters={semesterState?.semesters || []} ExamData={examSchedule}></ExamSchedule>,
    },
  ];


  if (userState?.user?.role === 'lecturer') {
    return (
      <>
        <div className="MainScreenSchedule">
          <ScheduleBoard semesters={semesterState?.semesters || []} ScheduleEvents={events}></ScheduleBoard>
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