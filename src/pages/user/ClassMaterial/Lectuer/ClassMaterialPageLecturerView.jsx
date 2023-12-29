import WeekMaterialLecturerView from '../../../../components/user/ClassMaterial/Lecturer/WeekMaterialLecturerView';
import InputScore from '../../../../components/user/InputScore/InputScore';
import CheckAttendance from '../../CheckAttendance/CheckAttendance';
import './ClassMaterialPageLecturerView.scss'

import { Tabs } from 'antd';

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'Class material',
    children: <WeekMaterialLecturerView></WeekMaterialLecturerView>,
  },
  {
    key: '2',
    label: 'Scores',
    children: <InputScore></InputScore>,
  },
  {
    key: '3',
    label: 'Attendances',
    children: <CheckAttendance></CheckAttendance>,
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
