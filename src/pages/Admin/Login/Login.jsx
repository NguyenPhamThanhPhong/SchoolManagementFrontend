import React from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
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

    const handleTest = () => {
        console.log(username);
        console.log(password)
    }

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
                        navigate('/admin')

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
                    <FormItem>
                        <Button type="primary" htmlType="submit" onClick={handleTest}>
                            click to test
                        </Button>
                    </FormItem>

                    <Form.Item>
                        <Button onClick={handleLoginClick} type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
