import './ClassList.scss'
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { userPaths } from '../../../routes/AppRoutes';
import SearchBox from '../SearchBox/SearchBox';
import { useState } from 'react';

function ClassList(props) {

    const linkTo = props.role === 'lecturer' ? userPaths.lecturerViewClass : userPaths.studentViewClass;

    console.log(props.ClassItems)

    let mySemester = "";
    if (!(props.Semester === undefined || props.Semester === null || props.Semester?.length === 0))
        mySemester = props.Semester[0];

    const [selectedSemester, setSelectedSemester] = useState(mySemester);

    const handleSelect = (eventKey) => {
        setSelectedSemester(eventKey);
    };
    return (
        <>
            <div className='bigContainer'>
                <SearchBox size="large"></SearchBox>
                <div className='dropSemester'>
                    <Dropdown id='dropSemester' onSelect={handleSelect}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {selectedSemester}
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            {props.Semester.map((item =>
                                (<Dropdown.Item eventKey={item}>{item}</Dropdown.Item>)
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <ul className="list-group">
                    {props.ClassItems.map((item =>
                    (<li className="list-group" key={item.ClassId}>
                        <Link to={linkTo + '/' + item?.ClassId} className="classitemContainer" style={{ textDecoration: 'none' }}>
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