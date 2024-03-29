import InputScore from '../../../../components/user/InputScore/InputScore';
import { useParams } from 'react-router-dom';
import './ClassMaterialPageLecturerView.scss'

import { Tabs, message } from 'antd';
import { useEffect, useState } from 'react';
import { useSchoolClassContext, setSchoolClasses } from '../../../../data-store';
import WeekMaterialLecturerView from '../../../../components/user/ClassMaterial/Lecturer/WeekMaterialLecturerView'

const onChange = (key) => {
  console.log(key);
};
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

function ClassMaterialPageLecturerView() {

  const { id: classId } = useParams();
  const [schoolClassState, schoolClassDispatch] = useSchoolClassContext();
  const [selectedClass, setSelectedClass] = useState(null);

  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (schoolClassState?.schoolClasses?.length > 0) {
      const schoolClass = schoolClassState.schoolClasses.find((item) => item.id === classId);
      if (schoolClass)
        setSelectedClass(schoolClass);
    }
  }, [])

  useEffect(() => {
    if (selectedClass) {
      setSections(selectedClass?.sections || []);
    }
  }, [selectedClass])

  const updateGlobalSchoolClasses = (newSchoolClass) => {
    if (schoolClassState?.schoolClasses) {
      const newSchoolClassIndex = schoolClassState?.schoolClasses.findIndex((item) => item.id === newSchoolClass.id);
      if (newSchoolClassIndex > 0) {
        let myNewSchoolClasses = schoolClassState?.schoolClasses;
        myNewSchoolClasses[newSchoolClassIndex] = newSchoolClass;
        schoolClassDispatch(setSchoolClasses);
        setSelectedClass(newSchoolClass);
      }
    }
  }



  const items = [
    {
      key: '1',
      label: 'Class material',
      children: <WeekMaterialLecturerView
        classId={selectedClass?.id}
        Sections={sections || []}
        updateGlobalSchoolClasses={updateGlobalSchoolClasses}
        setSections={setSections || (() => { })} ></WeekMaterialLecturerView>,
    },
    {
      key: '2',
      label: 'Scores',
      children: <InputScore classId={selectedClass?.id} classListData={selectedClass?.studentItems || []} ></InputScore>,
    },
  ];
  return (
    <>
      <div className="MainScreenClassMaterialLecuturerView">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </>
  );


}

export default ClassMaterialPageLecturerView;
