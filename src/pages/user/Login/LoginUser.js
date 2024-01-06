import './Login.css'
import { Link } from 'react-router-dom';
import { userPaths } from '../../../routes/AppRoutes';
import { Button, Input, message } from 'antd';
import { useEffect } from 'react';
function LoginUser() {

    const currentpath = window.location.pathname;
    useEffect(() => {
        message.info(`You now login on item ${currentpath}`);
    }, [currentpath])
    const LoginTitle = currentpath === userPaths.lecutrerLogin ? 'Login lecturer' : 'Login student';

    return (
        <div className='container'>
            <div className="mainLoginForm">
                <div className='LoginPage'>{LoginTitle}</div>
                <div className='LoginPlace'>
                    <Input id='userid' className='StudentId' placeholder='Enter your user id'></Input>
                    <Input.Password id='password' className='Password' placeholder='Enter your password'></Input.Password>
                    <div className='showpassword'>
                        <label >Forgot your password?</label>
                        <Button type='link'>Click here?</Button>
                    </div>
                    <Link to={userPaths.home}>
                        <button className='LoginButton'>Login</button>
                    </Link>
                </div>


            </div>
        </div>
    )
}
export default LoginUser;