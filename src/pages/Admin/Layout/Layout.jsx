import React, { useState } from 'react';
import { Layout, ConfigProvider, theme } from 'antd';
import './Layout.scss';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AppHeader from '../../../components/Admin/Header/Header';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;


const App = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const onToggleCollapse = () => {
        setCollapsed(!collapsed);
    };
    const {
        token: { borderRadiusLG },
    } = theme.useToken();


    return (
        <Layout>
            <Sidebar collapsed={collapsed} onCollapse={onToggleCollapse} />
            <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.2s' }}>
                <AppHeader collapsed={collapsed} onToggleCollapse={onToggleCollapse} />
                <Content
                    style={{
                        margin: '80px 16px',
                        minHeight: 280,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <ConfigProvider
                        theme={{
                            components: {
                                Table: {
                                    fontSize: '18px',
                                },
                            },
                        }}
                    >
                        {children}
                    </ConfigProvider>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
