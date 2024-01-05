import './Login.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { userPaths } from '../../../routes/AppRoutes';
function LoginUser() {


    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className='container'>
            <div className="mainLoginForm">
                <div className='LoginPage'>Login</div>
                <input id='userid' className='StudentId' placeholder='Enter your user id'></input>
                <input id='password'
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)
                    }
                    className='Password' placeholder='Enter your password'></input>

                <input id='show' type='checkbox' className='Checkbox'
                    value={showPassword}
                    onChange={() =>
                        setShowPassword((prev) => !prev)
                    }></input>
                <label className='showpassword' for="show">Show password</label>
                <Link to={userPaths.home}>
                    <button className='LoginButton'>Login</button>
                </Link>

            </div>
        </div>
    )
}
export default LoginUser;