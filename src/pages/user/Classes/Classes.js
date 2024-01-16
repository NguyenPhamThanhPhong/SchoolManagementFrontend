import './Classes.scss'
import ClassList from '../../../components/user/ClassList/ClassList';
import { useState } from 'react';
import { useSchoolClassContext, useUserContext } from '../../../data-store';

function Classes() {

  const [userState, userDispatch] = useUserContext();
  const [schoolClassState, schoolClassDispatch] = useSchoolClassContext();

  function getClasses() {
    if (userState !== undefined && userState?.user !== undefined && userState?.user?.classes !== undefined && schoolClassState?.schoolClasses !== undefined) {
      let classes = schoolClassState?.schoolClasses.filter((schoolClass) => userState?.user?.classes.includes(schoolClass.id));
      let displayClasses = classes.map((schoolClass) => {
        return {
          ClassId: schoolClass.id,
          SubjectName: schoolClass?.name,
          LecturerName: schoolClass?.lecturer?.name
        }
      })
      return displayClasses
    }
    else
      return [];
  }

  let Semester = ["Semester 1 (2023-2024)", "Semester 2 (2023-2024)", "Semester summer (2023-2024)"]

  return (
    <>
      <div>
        <ClassList role={userState?.role} Semester={Semester} ClassItems={getClasses()}></ClassList>
      </div>
    </>
  );
}

export default Classes;