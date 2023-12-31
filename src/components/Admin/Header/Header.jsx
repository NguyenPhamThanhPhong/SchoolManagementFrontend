import React from 'react';
import { Layout, Button, theme, Dropdown, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    BellOutlined,
    UserOutlined,
    TeamOutlined,
    SolutionOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

const AppHeader = ({ collapsed, onToggleCollapse }) => {
    const navigate = useNavigate();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const handleMenuClick = (e) => {
        switch (e.key) {
            case '1':
                navigate('/admin/user');
                break;
            case '2':
                navigate('/student/login');
                break;
            case '3':
                navigate('/lecturer/login');
                break;
            case '4':
                navigate('/admin/login');
                break;
            default:
                break;
        }
    };
    const items = [
        {
            label: 'Profile',
            key: '1',
            icon: <UserOutlined />,
        },
        {
            label: 'Student Site',
            key: '2',
            icon: <TeamOutlined />,
        },
        {
            label: 'Lecturer Site',
            key: '3',
            icon: <SolutionOutlined />,
        },
        {
            label: 'Logout',
            key: '4',
            icon: <LogoutOutlined />,
            danger: true,
        },
    ];
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <Header
            style={{
                padding: 0,
                background: colorBgContainer,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'fixed',
                width: '100%',
                zIndex: 1,
            }}
        >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={onToggleCollapse}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'fixed',
                    right: 10,
                }}
            >
                <Badge size="small" count={5}>
                    <Button type="text" icon={<BellOutlined />} />
                </Badge>

                <Dropdown menu={menuProps}>
                    <Button type="text" icon={<UserOutlined />}></Button>
                </Dropdown>
            </div>
        </Header>
    );
};

export default AppHeader;
