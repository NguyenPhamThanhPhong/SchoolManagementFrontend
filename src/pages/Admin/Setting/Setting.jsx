import React, { useState } from 'react';
import { Switch } from 'antd';

const Setting = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = (checked) => {
        setDarkMode(checked);
        // Something

        document.body.classList.toggle('dark-mode', checked);
    };

    return (
        <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
            <Switch defaultChecked={darkMode} onChange={toggleDarkMode} />
            <span>{darkMode ? 'Chế độ tối' : 'Chế độ sáng'}</span>
        </div>
    );
};

export default Setting;
