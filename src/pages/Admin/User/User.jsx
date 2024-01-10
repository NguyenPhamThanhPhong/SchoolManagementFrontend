import React, { useEffect, useState } from 'react';
import { Table, Input, Select, Modal, Form, Card, message } from 'antd';
import { useUserContext } from '../../../data-store';
import { AdminApi } from '../../../data-api';

const { Search } = Input;
const { Option } = Select;

const User = () => {
    const [form] = Form.useForm();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const [userState, setUserState] = useUserContext();
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await AdminApi.getAll();
            if (!response.isError) {
                setUsers(response.data?.data);
            }
            else
                message.error(`fetch users failed: ${response?.data}`)
        }
        catch (error) {
            message.error(`fetch users failed: ${error}`)
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (userState?.user) {
            form.setFieldsValue({
                username: userState?.user?.username,
                email: userState?.user?.email,
                password: userState?.user?.password,
            });
        }
    }, [userState?.user]);


    const handleCreateModalOk = () => {
        setIsCreateModalOpen(false);
    };

    const handleCreateModalCancel = () => {
        setIsCreateModalOpen(false);
    };


    return (
        <div style={{ display: 'flex', gap: '16px' }}>
            <Card title="Profile" style={{ flex: 1, width: '40%' }}>
                <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 10 }}>
                    <Form.Item label="Username" name="username">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Email" name="email">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Password" name="password">
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Card>

            <Card title="Member" style={{ flex: 1, width: '60%' }}>
                <Table
                    columns={[
                        {
                            title: <span className="custom-column-title">ID</span>,
                            dataIndex: 'username',
                            key: 'username',
                        },
                        {
                            title: <span className="custom-column-title">Username</span>,
                            dataIndex: 'password',
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
                    dataSource={users}
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
