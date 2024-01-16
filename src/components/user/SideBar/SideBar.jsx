import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideBar.scss';
import 'boxicons/css/boxicons.min.css';
import { userPaths } from '../../../routes/AppRoutes';
import { useUserContext, setLogout } from '../../../data-store';
import { useNavigate } from 'react-router-dom';

function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

const Sidebar = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    const [userState, userDispatch] = useUserContext();

    const handleLogout = () => {
        userDispatch(setLogout());
        deleteCookie('token');
        navigate('/student/login');
    }






    const sidebarNavItems = [
        {
            display: 'Home',
            icon: <i className='bx bx-home'></i>,
            to: userPaths.home,
            section: 'user-home'
        },
        {
            display: 'Schedule',
            icon: <i className='bx bx-calendar'></i>,
            to: userPaths.schedule,
            section: 'schedule'
        },
        {
            display: 'Classes',
            icon: <i className='bx bx-book'></i>,
            to: userPaths.classes,
            section: 'classes'
        },
        {
            display: 'User',
            icon: <i className='bx bx-user'></i>,
            to: userPaths.user_infor,
            section: 'student-user-info'
        },
        {
            display: 'Register',
            icon: <i class='bx bx-log-in-circle'></i>,
            to: '/student-register-subject',
            section: 'student-register-subject'
        }

    ]

    useEffect(() => {
        setTimeout(() => {
            const sidebarElement = sidebarRef.current;
            if (sidebarElement) {
                const sidebarItem = sidebarElement.querySelector('.sidebar__menu__item');
                if (sidebarItem) {
                    indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
                    setStepHeight(sidebarItem.clientHeight);
                }
            }
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return <nav className="navbar navbar-light navbar-vertical navbar-expand-xl">
        <div className='sidebar'>
            <div className="sidebar__logo">

            </div>
            <div ref={sidebarRef} className="sidebar__menu">
                <div
                    ref={indicatorRef}
                    className="sidebar__menu__indicator"
                    style={{
                        transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                    }}
                ></div>
                {
                    sidebarNavItems.map((item, index) => (
                        <Link to={item.to} key={index} style={{ textDecoration: 'none' }}>
                            <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                                <div className="sidebar__menu__item__icon">
                                    {item.icon}
                                </div>
                                <div className="sidebar__menu__item__text">
                                    {item.display}
                                </div>
                            </div>
                        </Link>

                    ))
                }
                <div onClick={handleLogout} className={`sidebar__menu__item`}>
                    <div className="sidebar__menu__item__icon">
                        <i class='bx bx-log-in-circle' style={{ color: 'red' }}></i>
                    </div>
                    <div className="sidebar__menu__item__text" style={{ color: 'red' }}>
                        Logout
                    </div>
                </div>
            </div>
        </div>
    </nav>;
};

export default Sidebar;