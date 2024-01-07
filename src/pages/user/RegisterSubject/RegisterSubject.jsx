import RegisterSubjectBoard from "../../../components/user/RegisterSubjectBoard/RegisterSubjectBoard";
import RegisteredSubjectBoard from "../../../components/user/RegisteredSubjectBoard/RegisteredSubjectBoard";
import Header from "../../../components/user/Header/Header";
import './RegisterSubject.scss'


import { Tabs } from 'antd';


function RegisterSubject() {
  const onChange = (key) => {
    console.log(key);
  };
  //
  const data = [
    {
      key: 1,
      No_: '1',
      subjectId: 'OOP.1',
      subject_name: 'OOP',
      date_start: '10/10/2023',
      date_end: '10/3/2023',
      lecturer_name: 'ABC',
      class_period: '1,2,3',
    },
    {
      key: 1,
      No_: '1',
      subjectId: 'OOP.1',
      subject_name: 'OOP',
      date_start: '10/10/2023',
      date_end: '10/3/2023',
      lecturer_name: 'ABC',
      class_period: '1,2,3',
    },
    {
      key: 1,
      No_: '1',
      subjectId: 'OOP.1',
      subject_name: 'OOP',
      date_start: '10/10/2023',
      date_end: '10/3/2023',
      lecturer_name: 'ABC',
      class_period: '1,2,3',
    }, {
      key: 1,
      No_: '1',
      subjectId: 'OOP.1',
      subject_name: 'OOP',
      date_start: '10/10/2023',
      date_end: '10/3/2023',
      lecturer_name: 'ABC',
      class_period: '1,2,3',
    },
    {
      key: 1,
      No_: '1',
      subjectId: 'OOP.1',
      subject_name: 'OOP',
      date_start: '10/10/2023',
      date_end: '10/3/2023',
      lecturer_name: 'ABC',
      class_period: '1,2,3',
    },
    {
      key: 1,
      No_: '1',
      subjectId: 'OOP.1',
      subject_name: 'OOP',
      date_start: '10/10/2023',
      date_end: '10/3/2023',
      lecturer_name: 'ABC',
      class_period: '1,2,3',
    },
    {
      key: 1,
      No_: '1',
      subjectId: 'OOP.1',
      subject_name: 'OOP',
      date_start: '10/10/2023',
      date_end: '10/3/2023',
      lecturer_name: 'ABC',
      class_period: '1,2,3',
    },
    {
      key: 1,
      No_: '1',
      subjectId: 'OOP.1',
      subject_name: 'OOP',
      date_start: '10/10/2023',
      date_end: '10/3/2023',
      lecturer_name: 'ABC',
      class_period: '1,2,3',
    },
    {
      key: 1,
      No_: '1',
      subjectId: 'OOP.1',
      subject_name: 'OOP',
      date_start: '10/10/2023',
      date_end: '10/3/2023',
      lecturer_name: 'ABC',
      class_period: '1,2,3',
    },
  ]
  //
  const items = [
    {
      key: '1',
      label: 'Register new subject',
      children: <RegisterSubjectBoard data={data}></RegisterSubjectBoard>,
    },
    {
      key: '2',
      label: 'Registered subject',
      children: <RegisteredSubjectBoard data={data}></RegisteredSubjectBoard>,
    },
  ];


  return (
    <>
      <div className="MainRegisterContainer">
        <Header></Header>
        <div className="BoardRegisterContainerRegis">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>

      </div>


    </>
  );
}

export default RegisterSubject;