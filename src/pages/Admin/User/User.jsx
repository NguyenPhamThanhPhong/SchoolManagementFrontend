import React, { useState } from 'react';
import { Space, Table, Button, Input, Select, Modal, Form, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const User = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const showCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreateModalOk = () => {
        setIsCreateModalOpen(false);
    };

    const handleCreateModalCancel = () => {
        setIsCreateModalOpen(false);
    };

    const handleCreate = () => {
        showCreateModal();
    };

    return (
        <div style={{ display: 'flex', gap: '16px' }}>
            <Card title="Profile" style={{ flex: 1, width: '40%' }}>
                <Form labelCol={{ span: 8 }} wrapperCol={{ span: 10 }}>
                    <Form.Item label="UserName" name="username">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Email" name="email">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Mật khẩu" name="password">
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Card>

            <Card title="Member" style={{ flex: 1, width: '60%' }}>
                <Table
                    columns={[
                        {
                            title: <span className="custom-column-title">ID</span>,
                            dataIndex: 'id',
                            key: 'id',
                        },
                        {
                            title: <span className="custom-column-title">Username</span>,
                            dataIndex: 'username',
                            key: 'username',
                        },
                        {
                            title: <span className="custom-column-title">Email</span>,
                            dataIndex: 'email',
                            key: 'email',
                        },
                        {
                            title: <span className="custom-column-title">Password</span>,
                            dataIndex: 'password',
                            key: 'password',
                        },
                    ]}
                    dataSource={[
                        {
                            key: '1',
                            id: '1',
                            username: 'user1',
                            password: '********',
                            email: 'user1@example.com',
                        },
                        {
                            key: '2',
                            id: '2',
                            username: 'user2',
                            password: '*******',
                            email: 'user2@example.com',
                        },
                    ]}
                />
            </Card>

            <Modal
                title="Thêm mới tài khoản"
                open={isCreateModalOpen}
                onOk={handleCreateModalOk}
                onCancel={handleCreateModalCancel}
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="UserName"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="PassWord"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default User;
