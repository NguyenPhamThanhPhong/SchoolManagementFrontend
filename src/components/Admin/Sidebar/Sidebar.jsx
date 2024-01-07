import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    HomeOutlined,
    WindowsOutlined,
    BookFilled,
    PartitionOutlined,
    UserOutlined,
    SolutionOutlined,
    ReadOutlined,
    TeamOutlined,
    SettingOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ collapsed, onCollapse }) => {
    const navigate = useNavigate();

    const menuItems = [
        { key: '/admin/', icon: <HomeOutlined style={{ fontSize: '18px' }} />, label: 'Home' },
        {
            key: '/admin/semester_faculty',
            icon: <WindowsOutlined style={{ fontSize: '18px' }} />,
            label: 'Semester_faculty',
        },
        { key: '/admin/subject', icon: <BookFilled style={{ fontSize: '18px' }} />, label: 'Subject' },
        { key: '/admin/class', icon: <PartitionOutlined style={{ fontSize: '18px' }} />, label: 'Class' },
        { key: '/admin/student', icon: <UserOutlined style={{ fontSize: '18px' }} />, label: 'Student' },
        { key: '/admin/lecturer', icon: <SolutionOutlined style={{ fontSize: '18px' }} />, label: 'Lecturer' },
        { key: '/admin/post', icon: <ReadOutlined style={{ fontSize: '18px' }} />, label: 'Post' },
        { key: '/admin/user', icon: <TeamOutlined style={{ fontSize: '18px' }} />, label: 'User' },
        { key: '/admin/login', icon: <LogoutOutlined style={{ fontSize: '18px' }} />, label: 'Logout' },
    ];

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            style={{
                position: 'fixed',
                height: '100vh',
                left: 0,
                zIndex: 1,
            }}
        >
            <div
                className="demo-logo-vertical"
                style={{
                    textAlign: 'center',
                    fontSize: '22px',
                    color: 'white',
                    lineHeight: '64px',
                    fontWeight: 'bold',
                }}
            >
                ADMIN
            </div>
            <Menu
                theme="dark"
                // mode="inline"
                defaultSelectedKeys={['1']}
                onClick={(item) => {
                    navigate(item.key);
                }}
                style={{ fontSize: '17px' }}
            >
                {menuItems.map((item) => (
                    <Menu.Item key={item.key} icon={item.icon}>
                        {item.label}
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
    );
};

export default Sidebar;
