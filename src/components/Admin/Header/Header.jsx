import React from 'react';
import './Header.scss';
import SearchBox from '../../Common/SearchBox/SearchBox';
import UserProfileMenu from '../UserProfileMenu/UserProfileMenu';

const Header = () => {
    return (
        <nav className="navbar navbar-light navbar-glass navbar-top navbar-expand">
            <ul className="navbar-nav align-items-center d-none d-lg-block">
                <SearchBox />
            </ul>
            <ul className="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
                <UserProfileMenu />
            </ul>
        </nav>
    );
};

export default Header;
