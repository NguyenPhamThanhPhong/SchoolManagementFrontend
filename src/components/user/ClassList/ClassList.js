import './ClassList.scss'
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
function ClassList() {
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



    ]
    return (
        <>
            <div className='bigContainer'>
                <div className='dropSemester'>
                    <Dropdown id='dropSemester'>
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
                <ul className="list-group">
                    {ClassItems.map((item =>
                    (<li className="list-group" key={item.ClassId}>
                        <Link to='/student-classes/id' className="classitemContainer" style={{ textDecoration: 'none' }}>
                            <div className='firstLine'>{item.SubjectName} - {item.ClassId}</div>
                            <div className='secondLine'>{item.LecturerName}</div>
                        </Link>
                    </li>)
                    ))}
                </ul>
            </div>
        </>
    )
}

export default ClassList;