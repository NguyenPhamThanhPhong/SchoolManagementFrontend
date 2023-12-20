import React from 'react';
import { Layout, Button, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader = ({ collapsed, onToggleCollapse }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
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
                <Button type="text" icon={<BellOutlined />} />
                <Button type="text" icon={<UserOutlined />} />
            </div>
        </Header>
    );
};

export default AppHeader;
