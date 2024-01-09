import React from 'react';
import { Form, Input, Button, Checkbox, Card, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useUserContext, setLogin } from '../../../data-store';
import AdminApi from '../../../data-api/admin-api';

import './Login.scss';
import FormItem from 'antd/es/form/FormItem';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [userState, userDispatch] = useUserContext();

    const [userType, setUserType] = useState('admin');

    const handleUserTypeChange = (value) => {
        setUserType(value);
        const redirectPath = `/${value}/login`;
        window.location.href = redirectPath;
    };

    const navigate = useNavigate();

    const handleLoginAPI = async () => {

    }

    const handleLoginClick = async () => {
        if (username !== "" && password !== "") {
            try {
                let response = await AdminApi.loginUser(username, password)
                if (!response.isError) {
                    console.log(response.data.status)
                    if (response.data.status === 200) {

                        const expires = new Date();
                        expires.setTime(expires.getTime() + 2 * 24 * 60 * 60 * 1000);
                        document.cookie = `token=${response.data.data?.accessToken};expires=${expires.toUTCString()};path=/`;

                        let loginData = {
                            user: response.data.data?.account,
                            isLogin: true,
                            role: 'admin',
                            adminAccounts: []
                        }
                        userDispatch(setLogin(loginData));
                        navigate('/admin')

                    }
                }
                else {
                    console.log(response)
                }
            } catch (error) {
            }
        }
    }


    const backgroundImage =
        'url("https://png.pngtree.com/thumb_back/fh260/background/20200809/pngtree-doodles-on-green-chalkboard-background-back-to-school-background-image_389839.jpg")';

    return (
        <div className="login-container" style={{ backgroundImage }}>
            <Card title="Login" className="login-card">
                <Form name="login-form" initialValues={{ remember: true }}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input value={username} onChange={(event) => { setUsername(event.target.value) }} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"

                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password value={password} onChange={(event) => { setPassword(event.target.value) }} />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button onClick={handleLoginClick} type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>

                </Form>
                <Form.Item
                    label="Swith to"
                    name="userType"
                    rules={[{ required: true, message: 'Please select a user type!' }]}
                >
                    <Select value={userType} defaultValue="admin" onChange={handleUserTypeChange}>
                        <Select.Option value="admin">Admin</Select.Option>
                        <Select.Option value="student">Student</Select.Option>
                        <Select.Option value="lecturer">Lecturer</Select.Option>
                    </Select>
                </Form.Item>
            </Card>
        </div>
    );
};

export default Login;
