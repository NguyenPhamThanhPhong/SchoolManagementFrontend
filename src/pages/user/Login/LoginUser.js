import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { userPaths } from '../../../routes/AppRoutes';
import { Button, Input, message, notification } from 'antd';
import { useEffect, useState } from 'react';
import 'boxicons/css/boxicons.min.css';

import { StudentApi, lecturerApi } from '../../../data-api';
import { useUserContext, setLogin } from '../../../data-store';

function LoginUser() {
    const [currentpath, setCurrentpath] = useState(window.location.pathname);
    useEffect(() => {
        setCurrentpath(window.location.pathname);
    }, [currentpath])
    const LoginTitle = currentpath === userPaths.lecutrerLogin ? 'Login lecturer' : 'Login student';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [userState, userDispatch] = useUserContext();
    const navigate = useNavigate();

    const handleRecoverPassword = (username) => {
        if (currentpath === userPaths.lecutrerLogin) {
            try {
                const response = lecturerApi.recoverPassword(username);
                if (response.isError) {
                    message.error(response.data.message);
                }
                else {
                    message.success(response.data.message);
                }
            }
            catch (error) {
                message.error(error.message);
            }
        }
        else {
            try {
                const response = StudentApi.recoverPassword(username);
                if (response.isError) {
                    message.error(response.data.message);
                }
                else {
                    message.success(response.data.message);
                }
            }
            catch (error) {
                message.error(error.message);
            }
        }
    }

    const handleLogin = async () => {
        if (currentpath === userPaths.lecutrerLogin) {
            try {
                const response = await lecturerApi.lecturerLogin(username, password);
                if (response.data.status === 200) {

                    const expires = new Date();
                    expires.setTime(expires.getTime() + 2 * 24 * 60 * 60 * 1000);
                    message.success(response.data.data?.accessToken)
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

    const forgotPassword = () => {
        notification.open({
            icon: <i class='bx bxs-badge-check' style={{ color: '#2f88ff' }}  ></i>,
            message: 'Success',
            description:
                'Your password had been sent to your mail! ',
            duration: 0,
        });
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
                        <Button type='link' onClick={forgotPassword}>Click here?</Button>
                    </div>
                    <button className='LoginButton' onClick={handleLogin}>Login</button>

                </div>


            </div>
        </div>
    )
}
export default LoginUser;