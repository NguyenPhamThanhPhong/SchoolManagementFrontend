import './Userinformation.scss'
import ScoreBoard from '../ScoreBoard/ScoreBoard';


function UserInformation(props) {
    return (
        <div className='MainContainEr'>
            <div className="UserPic">
                <img className='userPicture' src={props.Avatar} />
            </div>
            <div className='UserBasicInfor'>
                <ul class="list-group">
                    <li class="list-group-item" id='inforItem'>Full name: {props.Full_name}</li>
                    <li class="list-group-item" id='inforItem'>Student ID: {props.Student_ID}</li>
                    <li class="list-group-item" id='inforItem'>Date of birth: {props.DateOfBirth}</li>
                    <li class="list-group-item" id='inforItem'>Gender: {props.Gender}</li>
                    <li class="list-group-item" id='inforItem'>Phone number: {props.Phone_number}</li>
                    <li class="list-group-item" id='inforItem'>Program: {props.Program}</li>
                    <li class="list-group-item" id='inforItem'>Faculty: {props.Faculty}</li>

                </ul>

            </div>

            <div className='Score'>
                <span>Student's score</span>
                <ScoreBoard></ScoreBoard>
            </div>
        </div>
    )
}
export default UserInformation;