import { userPaths } from '../../../routes/AppRoutes';
import { Link } from 'react-router-dom';
import './Header.css'
import 'boxicons/css/boxicons.min.css';
import { Button } from 'antd';
function Header() {

    return <div className='header'>
        <div className='logo'>
            <i class='bx bxs-graduation' style={{ color: '#2f88ff' }}>
                <span className='uniName'>University</span>
            </i>
        </div>
        <div className='UserandNavigation'>
            <Link to={userPaths.user_infor} >
                <img style={{ width: '40px', height: '40px', marginTop: '15%' }} className='userPicture' src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} />
            </Link>

        </div>


    </div >

}
export default Header;