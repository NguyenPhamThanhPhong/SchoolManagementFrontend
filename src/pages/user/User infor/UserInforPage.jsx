
import UserInformation from "../../../components/user/Userinfor/Userinformation";
import User from "../../Admin/User/User";

import { useEffect, useState } from 'react';
import { useUserContext } from "../../../data-store";
import { message } from "antd";

function UserInforPage() {

  const [userState, userDispatch] = useUserContext();

  let creditLogs = userState?.user?.creditLogs;

  function generateRows() {
    if (creditLogs !== undefined && creditLogs !== null) {
      let distinctSemester = [];
      for (let i = 0; i < creditLogs.length; i++) {
        let semester = creditLogs[i].semesterId;
        if (!distinctSemester.includes(semester)) {
          distinctSemester.push({ semesterId: semester, children: [] });
        }
      }
      for (let i = 0; i < creditLogs.length; i++) {
        let semester = creditLogs[i].semesterId;
        let index = distinctSemester.findIndex(item => item.semesterId === semester);
        distinctSemester[index].children.push(creditLogs[i]);
      }
      return distinctSemester;
    }
    return [];
  }


  function mapProfile(userProfile) {
    if (userProfile !== undefined && userProfile !== null) {
      return {
        avatarUrl: userProfile?.personalInfo?.avatarUrl,
        name: userProfile?.personalInfo?.name,
        phone: userProfile?.personalInfo?.phone,
        dateofbirth: userProfile?.personalInfo?.dateofbirth,
        gender: userProfile?.personalInfo?.gender,
        id: userProfile?.id,
        email: userProfile?.email,
        Program: userProfile?.personalInfo?.program,
        Faculty: userProfile?.personalInfo?.facultyId,
      }
    }
    else
      return {
        avatarUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        name: 'Nguyen Van A',
        phone: '0123456789',
        dateofbirth: '01/01/2003',
        gender: 'Male',
        id: '123456',
        email: 'student@gmail.com',
        Program: 'CLC',
        Faculty: 'SE',
      }
  }


  return (
    <>
      <div className="mainUserInfor">
        <UserInformation
          Avatar={mapProfile(userState?.user)?.avatarUrl}
          Full_name={mapProfile(userState?.user)?.name}
          Student_ID={mapProfile(userState?.user)?.id}
          DateOfBirth={mapProfile(userState?.user)?.dateofbirth}
          Gender={mapProfile(userState?.user)?.gender}
          Phone_number={mapProfile(userState?.user)?.phone}
          Program={mapProfile(userState?.user)?.Program}
          Faculty={mapProfile(userState?.user)?.Faculty}
          StudentScoreData={generateRows()}
        />
      </div>
    </>
  );
}

export default UserInforPage;


// [
//   {
//     key: 1,
//     No_: 'Semester 1(2023- 2024)',
//     children: childrenScore,
//   },
//   {
//     key: 5,
//     No_: 'Semester 1(2023- 2024)',
//     children: [
//       {
//         key: 6,
//         No_: '1',
//         subject_id: 'OOP.1',
//         subject_name: 'OOP',
//         progress_score: 10,
//         midterm_score: 10,
//         practice_score: 10,
//         finalterm_score: 10,
//         average_score: 10
//       },
//       {
//         key: 7,
//         No_: '2',
//         subject_id: 'OOP.1',
//         subject_name: 'OOP',
//         progress_score: 10,
//         midterm_score: 10,
//         practice_score: 10,
//         finalterm_score: 10,
//         average_score: 10
//       },
//       {
//         key: 8,
//         No_: '3',
//         subject_id: 'OOP.1',
//         subject_name: 'OOP',
//         progress_score: 10,
//         midterm_score: 10,
//         practice_score: 10,
//         finalterm_score: 10,
//         average_score: 10
//       }
//     ]
//   },
//   {
//     key: 10,
//     No_: 'Semester 1(2023- 2024)',
//     children: [

//     ]
//   }
// ]