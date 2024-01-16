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
    name: 'Tran Van A',
    id: '32',
    progress: 8,
    midterm: 9,
    practice: 9,
    final: 9,
  },
  {
    key: '1',
    name: 'Tran Van B',
    id: '31',
    progress: 8,
    midterm: 9,
    practice: 9,
    final: 9,
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
    children: <InputScore classListData={ScoreData} classs={1}></InputScore>,
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
