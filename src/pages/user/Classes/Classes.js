import './Classes.scss'
import ClassList from '../../../components/user/ClassList/ClassList';

function Classes() {
  const userState = {
    user: {},
    role: 'lecturer',
    isLoggedin: true,
  }
  let Semester = ["Semester 1 (2023-2024)", "Semester 2 (2023-2024)", "Semester summer (2023-2024)"]
  let ClassItems = [
    {
      ClassId: "Class1",
      SubjectName: "Subject1",
      LecturerName: "Lecturer1"
    },
    {
      ClassId: "Class2",
      SubjectName: "Subject2",
      LecturerName: "Lecturer2"
    },
    {
      ClassId: "Class3",
      SubjectName: "Subject3",
      LecturerName: "Lecturer3"
    },
    {
      ClassId: "Class4",
      SubjectName: "Subject4",
      LecturerName: "Lecturer4"
    },
    {
      ClassId: "Class5",
      SubjectName: "Subject5",
      LecturerName: 'Lecturer5'
    },
    {
      ClassId: "Class6",
      SubjectName: "Subject6",
      LecturerName: 'Lecturer6'
    },



  ]
  return (
    <>
      <div>
        <ClassList role={userState.role} Semester={Semester} ClassItems={ClassItems}></ClassList>
      </div>
    </>
  );
}

export default Classes;