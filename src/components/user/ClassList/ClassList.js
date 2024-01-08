import './ClassList.scss'
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { userPaths } from '../../../routes/AppRoutes';
import SearchBox from '../SearchBox/SearchBox';
import { message } from 'antd';
function ClassList(props) {

    const linkTo = props.role === 'lecturer' ? userPaths.lecturerViewClass.replace(":id", "") : userPaths.studentViewClass.replace(":id", "")


    return (
        <>
            <div className='bigContainer'>
                <SearchBox size="large"></SearchBox>
                <div className='dropSemester'>
                    <Dropdown id='dropSemester'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {props.Semester[props.Semester.length - 1]}
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            {props.Semester.map((item =>
                                (<Dropdown.Item id="dropdown-basic-items">{item}</Dropdown.Item>)
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <ul className="list-group">
                    {props.ClassItems.map((item =>
                    (<li className="list-group" key={item.ClassId}>
                        <Link to={linkTo + item?.ClassId} className="classitemContainer" style={{ textDecoration: 'none' }}>
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