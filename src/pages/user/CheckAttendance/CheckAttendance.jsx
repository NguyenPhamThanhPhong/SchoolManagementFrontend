import CheckAttendanceBoard from "../../../components/user/CheckAttendanceBoard/CheckAttendanceBoard";

import Header from "../../../components/user/Header/Header";
import './CheckAttendance.scss'
function CheckAttendance() {
    return (
      <>
        <div >
            <Header></Header>
            <div className="checkAttendanceCont">
                <CheckAttendanceBoard></CheckAttendanceBoard>
            </div>
           
        </div>
      </>
    );
  }
  
  export default CheckAttendance;