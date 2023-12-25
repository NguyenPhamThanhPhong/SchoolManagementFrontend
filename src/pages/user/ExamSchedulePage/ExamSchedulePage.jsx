import ExamSchedule from "../../../components/user/ExamSchedule/ExamSchedule";
import { Button } from 'antd'
import Dropdown from 'react-bootstrap/Dropdown';
import './ExamSchedulePage.scss'

function ExamSchedulePage() {
    let Semester = ["Semester 1 (2023-2024)", "Semester 2 (2023-2024)", "Semester summer (2023-2024)"]
    return (
        <>
            <div className="ExamScheduleCont">
                <div className='dropSemester_1'>
                    <Dropdown id='dropSemester_1'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {Semester[Semester.length - 1]}
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            {Semester.map((item =>
                                (<Dropdown.Item id="dropdown-basic-items">{item}</Dropdown.Item>)
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                </div>

                <ExamSchedule></ExamSchedule>
            </div>
        </>
    )
}
export default ExamSchedulePage;