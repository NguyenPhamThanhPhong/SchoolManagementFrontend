import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideBar.scss';
import 'boxicons/css/boxicons.min.css';

const sidebarNavItems = [
    {
        display: 'Home',
        icon: <i className='bx bx-home'></i>,
        to: '/user-home',
        section: 'user-home'
    },
    {
        display: 'Notification',
        icon: <i className='bx bx-bell'></i>,
        to: '/user-notification',
        section: 'user-notification'
    },
    {
        display: 'Schedule',
        icon: <i className='bx bx-calendar'></i>,
        to: '/student-schedule',
        section: 'student-schedule'
    },
    {
        display: 'Classes',
        icon: <i className='bx bx-book'></i>,
        to: '/student-classes',
        section: 'student-classes'
    },
    {
        display: 'User',
        icon: <i className='bx bx-user'></i>,
        to: '/student-user-info',
        section: 'student-user-info'
    },
    {
        display: 'Register',
        icon: <i className='bx bx-user'></i>,
        to: '/student-register-subject',
        section: 'student-register-subject'
    },

]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
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
            </div>
        </div>
    </nav>;
};

export default Sidebar;