
import UserInformation from "../../../components/user/Userinfor/Userinformation";
import User from "../../Admin/User/User";

function UserInforPage() {
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
        />
      </div>
    </>
  );
}

export default UserInforPage;
