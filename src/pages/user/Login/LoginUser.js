import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { userPaths } from '../../../routes/AppRoutes';
import { Button, Input, message, notification, Select, Form, Modal } from 'antd';
import { useEffect, useState } from 'react';
import 'boxicons/css/boxicons.min.css';

import { StudentApi, lecturerApi } from '../../../data-api';
import { useUserContext, setLogin } from '../../../data-store';
import DeleteWarningModal from '../../../components/Admin/Modal/DeleteWarningModal';

function LoginUser() {
    const [form] = Form.useForm();
    const [currentpath, setCurrentpath] = useState(window.location.pathname);
    useEffect(() => {
        setCurrentpath(window.location.pathname);
    }, [currentpath])
    const LoginTitle = currentpath === userPaths.lecutrerLogin ? 'Login lecturer' : 'Login student';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('admin');


    const [userState, userDispatch] = useUserContext();
    const navigate = useNavigate();

    const [modalState, setModalState] = useState(false);
    const [recoverUsername, setRecoverUsername] = useState('');

    const handleLogin = async () => {
        if (currentpath === userPaths.lecutrerLogin) {
            try {
                const response = await lecturerApi.lecturerLogin(username, password);
                if (response.data.status === 200) {

                    const expires = new Date();
                    expires.setTime(expires.getTime() + 2 * 24 * 60 * 60 * 1000);
                    //message.success(response.data.data?.accessToken)
                    document.cookie = `token=${response.data.data?.accessToken};expires=${expires.toUTCString()};path=/`;

                    let loginData = {
                        user: response.data.data?.account,
                        isloggedIn: true,
                        role: 'lecturer',
                        adminAccounts: []
                    }
                    userDispatch(setLogin(loginData));
                    navigate('/user-home')
                }
                else {
                    message.error(response.data.message);
                }
            }
            catch (error) {
                message.error(error.message);
            }
        }
        else {
            try {
                const response = await StudentApi.studentLogin(username, password);

                if (!response.isError) {

                    const expires = new Date();
                    expires.setTime(expires.getTime() + 2 * 24 * 60 * 60 * 1000);
                    document.cookie = `token=${response.data.data?.accessToken};expires=${expires.toUTCString()};path=/`;
                    let loginData = {
                        user: response.data.data?.account,
                        isloggedIn: true,
                        role: 'lecturer',
                        adminAccounts: []
                    }
                    userDispatch(setLogin(loginData));
                    navigate('/user-home')
                }
                else {
                    message.error(response.data.message);
                }
            }
            catch (error) {
                message.error(error.message);
            }
        }
    }

    const forgotPassword = async () => {

        if (currentpath.startsWith('/lecturer')) {
            try {
                const response = await lecturerApi.getPassword(recoverUsername)
                if (response.isError) {
                    message.error(response.data.message);
                }
                else {
                    notification.open({
                        icon: <i class='bx bxs-badge-check' style={{ color: '#2f88ff' }}  ></i>,
                        message: 'Success',
                        description:
                            'Your password had been sent to your mail! ',
                        duration: 0,
                    });
                }
            }
            catch (error) {
                message.error(error.message);
            }
        }
        else {
            try {
                const response = await StudentApi.studentGetPassword(recoverUsername)
                if (response.isError) {
                    message.error(response.data.message);
                }
                else {
                    notification.open({
                        icon: <i class='bx bxs-badge-check' style={{ color: '#2f88ff' }}  ></i>,
                        message: 'Success',
                        description:
                            'Your password had been sent to your mail! ',
                        duration: 0,
                    });
                }
            }
            catch (error) {
                message.error(error.message);
            }
        }


    };
    const handleUserTypeChange = (value) => {
        setUserType(value);
        const redirectPath = `/${value}/login`;
        window.location.href = redirectPath;
    };


    return (
        <div className='container'>
            <div className="mainLoginForm">
                <div className='LoginPage'>{LoginTitle}</div>
                <div className='LoginPlace'>
                    <Input value={username} onChange={(e) => setUsername(e.target.value)}
                        id='userid' className='StudentId' placeholder='Enter your user name'></Input>
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)}
                        id='password' className='Password' placeholder='Enter your password'></Input.Password>
                    <div className='showpassword'>
                        <label >Forgot your password?</label>
                        <Button type='link' onClick={() => { setModalState(true) }}>Click here?</Button>
                    </div>
                    <button className='LoginButton' onClick={handleLogin}>Login</button>
                    <Form style={{ width: '200px', float: 'right', marginTop: '80px' }}>
                        <Form.Item
                            label="Switch to"
                            name="userType"
                            rules={[{ required: true, message: 'Please select a user type!' }]}
                        >
                            <Select value={userType} defaultValue="Student" onChange={handleUserTypeChange}>
                                <Select.Option value="student">Student</Select.Option>
                                <Select.Option value="lecturer">Lecturer</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </div>
                <Modal
                    title="Enter your username to recover your password"
                    visible={modalState}
                    onOk={forgotPassword}
                    onCancel={() => setModalState(false)}
                    footer={[
                        <Button key="ok" type="primary" danger onClick={forgotPassword}>
                            Recover
                        </Button>,
                        <Button key="cancel" type="primary" onClick={() => { setModalState(false) }}>
                            Cancel
                        </Button>,
                    ]}
                >
                    <Input value={recoverUsername} onChange={(e) => setRecoverUsername(e.target.value)}
                        placeholder='Enter your user name'></Input>
                </Modal>


            </div>
        </div>
    )
}
export default LoginUser;