import React from 'react';
import StudentApi from '../../data-api/student-api';

function MyPage() {

    var user = {
        id: Math.floor(Math.random() * 1000000).toString(),
        username: "phong" + Math.floor(Math.random() * 100),
        password: "123456",
        email: "21522458@gm.uit.edu.vn",
        role: "student",
        personalInfo: {
            dateOfBirth: new Date("01/01/2000"),
            name: "Nguyen Van Phong",
            gender: "male",
            phone: "0123456789",
            faculty: "Information Technology",
            program: "CLC"
        }
    }
    const handleCreateUser = async () => {
        try {
            const response = await StudentApi.registerUser(user);
            if (!response.isError) {
                console.log(response.data);
            }
            else {
                console.log(response)
                console.log(response.data.status)
            }
        }
        catch (error) {
            console.log(error.response)
        }
    }
    return (
        <div>
            <h1>Hello</h1>
            <button onClick={handleCreateUser}>Create User</button>

            {/* Your component content goes here */}
        </div>
    );
}

export default MyPage;
