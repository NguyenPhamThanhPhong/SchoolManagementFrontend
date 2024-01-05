
import UserInformation from "../../../components/user/Userinfor/Userinformation";
import User from "../../Admin/User/User";

function UserInforPage() {

  let creditLogs = {
    "semester II 2020-2021":
      [
        {
          id: "SE001",
          name: "Software Engineering",
          scores: [9, 9, 9, 9, 9],
          status: "passed",
        }
      ],
    "semester III 2020-2021": [
      {
        id: "SE001",
        name: "Software Engineering",
        scores: [9, 9, 9, 9, 9],
        status: "passed",
      },
      {
        id: "SE001",
        name: "Software Engineering",
        scores: [9, 9, 9, 9, 9],
        status: "passed",
      },
      {
        id: "SE001",
        name: "Software Engineering",
        scores: [9, 9, 9, 9, 9],
        status: "passed",
      }
    ],
    "semester IV 2020-2021": [
      {
        id: "SE001",
        name: "Software Engineering",
        scores: [9, 9, 9, 9, 9],
        status: "passed",
      }
    ]
  }

  function generateChildren(row) {
    let scores = [9, 9, 9, 9, 9]

    let myScoreItem = {
      key: '-1',
      subject_id: row?.id,
      subject_name: row?.name,
      status: row?.status,
    }

    for (var i = 0; i < scores.length; i++) {
      switch (i) {
        case 0:
          myScoreItem.progress_score = scores[i];
          break;
        case 1:
          myScoreItem.midterm_score = scores[i];
          break;
        case 2:
          myScoreItem.practice_score = scores[i];
          break;
        case 3:
          myScoreItem.finalterm_score = scores[i];
          break;
        case 4:
          myScoreItem.average_score = scores[i];
          break;
        default:
          break;
      }
    }
    return myScoreItem;
  }

  let datas = []

  for (let [semester, rows] of Object.entries(creditLogs)) {
    console.log(JSON.stringify(rows))
    let myRows = rows?.map(row => generateChildren(row))
    console.log(JSON.stringify(myRows))
    datas.push({
      key: semester,
      No_: semester,
      children: myRows
    });
  }

  const StudentScoreData = datas

  const UserInformationItem =
  {
    Avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    Full_name: 'Nguyen Van A',
    Phone_number: '0123456789',
    DateOfBirth: '01/01/2003',
    Gender: 'Male',
    Student_ID: '123456',
    //Email: 'student@gmail.com',
    Program: 'CLC',
    Faculty: 'SE',

  }

  return (
    <>
      <div className="mainUserInfor">
        <UserInformation
          Avatar={UserInformationItem.Avatar}
          Full_name={UserInformationItem.Full_name}
          Student_ID={UserInformationItem.Student_ID}
          DateOfBirth={UserInformationItem.DateOfBirth}
          Gender={UserInformationItem.Gender}
          Phone_number={UserInformationItem.Phone_number}
          Program={UserInformationItem.Program}
          Faculty={UserInformationItem.Faculty}
          StudentScoreData={StudentScoreData}
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