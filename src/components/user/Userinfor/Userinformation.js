import './Userinformation.scss'
import ScoreBoard from '../ScoreBoard/ScoreBoard';


function UserInformation() {
    const UserInformation = [
        {
            Full_name: 'Nguyen Van A',
            Student_ID: '123456',
            Email: 'student@gmail.com',
            Faculty: 'Software',
            Phone_number: '0123456789',
        }
    ]
    return (
        <div className='MainContainEr'>
            {/*<div className="UserPic">
                    <div className='userPicture'></div>
    </div> */}
            <div className='UserBasicInfor'>
                {UserInformation.map((item =>
                (
                    <ul class="list-group">
                        <li class="list-group-item" id='inforItem'>Full name: {item.Full_name}</li>
                        <li class="list-group-item" id='inforItem'>Student ID: {item.Student_ID}</li>
                        <li class="list-group-item" id='inforItem'>Email: {item.Email}</li>
                        <li class="list-group-item" id='inforItem'>Faculty: {item.Faculty}</li>
                        <li class="list-group-item" id='inforItem'>Phone number: {item.Phone_number}</li>
                    </ul>
                )
                ))}
            </div>

            <div className='Score'>
                <span>Student's score</span>
                <ScoreBoard></ScoreBoard>
            </div>
        </div>
    )
}
export default UserInformation;