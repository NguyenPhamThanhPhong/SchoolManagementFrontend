import WeekMaterialLecturerView from '../../../../components/user/ClassMaterial/Lecturer/WeekMaterialLecturerView';
import InputScore from '../../../../components/user/InputScore/InputScore';
import './ClassMaterialPageLecturerView.scss'

import { Tabs } from 'antd';

const onChange = (key) => {
  console.log(key);
};
const ScoreData = [
  {
    key: '0',
    No_: 1,
    name: 'Tran Van A',
    student_id: '32',
    progress_score: '8'
  },
  {
    key: '1',
    name: 'Ten gi do',
    student_id: '21155',
  },
];
//
const WFiles = ['Helloworld.pdf', 'Hi.pdf']
const Sections =
  [
    {
      SectionTitle: 'Week 1',
      Content: '<h2>Hello</h2>',
      WFile: WFiles,
    },
    {
      SectionTitle: 2,
      Content: '<h2>Hello</h2>',
      WFile: WFiles,
    },
    {
      SectionTitle: 3,
      Content: '<h1>Hello</h1>',
      WFile: WFiles,
    },
  ];
//
const items = [
  {
    key: '1',
    label: 'Class material',
    children: <WeekMaterialLecturerView Sections={Sections}></WeekMaterialLecturerView>,
  },
  {
    key: '2',
    label: 'Scores',
    children: <InputScore ScoreData={ScoreData}></InputScore>,
  },
];
function ClassMaterialPageLecturerView() {

  return (
    <>
      <div className="MainScreenClassMaterialLecuturerView">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </>
  );


}

export default ClassMaterialPageLecturerView;
