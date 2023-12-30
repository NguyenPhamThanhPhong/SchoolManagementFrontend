import { Card, Table, Divider, Descriptions, Badge, Breadcrumb, Button, Space, Calendar } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StudentApi } from '../../../data-api/index';
import { useStudentContext } from '../../../data-store';


const { Column } = Table;

const scoreListData = [
    {
        semester: '--HK I 2023-2024',
        scores: [
            {
                ID: 'Se001.O11.PMCL',
                name: 'Lap trinh',
                progress: '9',
                midtearn: '9',
                practice: '9',
                final: '9',
                GPA: '9',
            },
            {
                ID: 'Se001.O11.PMCL',
                name: 'Lap trinh',
                progress: '9',
                midtearn: '9',
                practice: '9',
                final: '9',
                GPA: '9',
            }
        ]
    },
    {
        semester: '--HK II 2023-2024',
        scores: [
            {
                ID: 'Se001',
                name: 'Lap trinh',
                progress: '9',
                midtearn: '9',
                practice: '9',
                final: '9',
                GPA: '9',
            },
            {
                ID: 'Se001',
                name: 'Lap trinh',
                progress: '9',
                midtearn: '9',
                practice: '9',
                final: '9',
                GPA: '9',
            }
        ]
    },
];
const PasswordItem = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Space>
            {showPassword ? (
                <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
            ) : (
                <EyeOutlined onClick={togglePasswordVisibility} />
            )}
            <span>{showPassword ? 'password' : '*********'}</span>
        </Space>
    );
};


const columns = [
    { title: 'ID', dataIndex: 'id', key: 'ID' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Progress', dataIndex: 'progress', key: 'progress' },
    { title: 'Midterm', dataIndex: 'midtearn', key: 'midtearn' },
    { title: 'Practice', dataIndex: 'practice', key: 'practice' },
    { title: 'Final', dataIndex: 'final', key: 'final' },
    { title: 'GPA', dataIndex: 'GPA', key: 'GPA' },
];

function DetailStudent() {
    const [openTerms, setOpenTerms] = useState([]);

    const [studentGLobalState, studentGlobalDispatch] = useStudentContext();
    const [selectedStudent, setSelectedStudent] = useState({});

    const navigate = useNavigate();
    let studentId = useParams().id;
    const fetchSingleStudent = async () => {
        try {
            let response = await StudentApi.studentGetbyId(studentId);
            if (!response.isError) {
                if (response.data.data !== null) {
                    setSelectedStudent(response.data.data);

                }
                else
                    navigate('/admin/student')
            }
            else
                navigate('/admin/student')
        }
        catch (error) {
            navigate('/admin/student')
        }
    }

    useEffect(() => {
        // if (studentGLobalState.currentStudent !== null && studentGLobalState.currentStudent.id === studentId) {
        //     setSelectedStudent(studentGLobalState.currentStudent);
        // }
        // else {

        // }
        fetchSingleStudent();
    }, [])


    const items = [
        {
            key: '1',
            label: 'ID',
            children: selectedStudent?.id || '',
        },
        {
            key: '2',
            label: 'Username',
            children: selectedStudent?.username || '',
        },
        {
            key: '3',
            label: 'joining college year',
            children: '2020-2021',
        },
        {
            key: '4',
            label: 'Full Name',
            children: selectedStudent?.personalInfo?.name || '',
        },
        {
            key: '5',
            label: 'Password',
            children: selectedStudent?.password || '',
        },
        {
            key: '6',
            label: 'Faculty',
            children: selectedStudent?.personalInfo?.facultyId || '',
        },
        {
            key: '7',
            label: 'Gender',
            children: selectedStudent?.personalInfo?.gender || '',
        },
        {
            key: '8',
            label: 'email',
            children: selectedStudent?.email || '',
        },
        {
            key: '9',
            label: 'Program',
            children: selectedStudent?.personalInfo?.program || '',
        },
        {
            key: '3',
            label: 'Date of Birth',
            children: selectedStudent?.personalInfo?.dateOfBirth || '',
        }
    ];

    const handleTermClick = (term) => {
        setOpenTerms((prevOpenTerms) =>
            prevOpenTerms.includes(term) ? prevOpenTerms.filter((t) => t !== term) : [...prevOpenTerms, term],
        );
    };
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    return (
        <div>
            <Card>
                {/* <Breadcrumb
                    items={[
                        {
                            title: (
                                <a href="/student" className="breadcrumb-link">
                                    Student
                                </a>
                            ),
                        },
                        {
                            title: <span className="breadcrumb-link">Detail Student</span>,
                        },
                    ]}
                /> */}
                <Divider style={{ color: 'blue', fontSize: '16px' }}>Thông tin sinh viên</Divider>
                <Descriptions bordered items={items} />

                <Divider style={{ color: 'blue', fontSize: '16px' }}>Kết quả học tập</Divider>
                {scoreListData.map((score) => (
                    <div key={score.semester}>
                        <Button type="text" onClick={() => handleTermClick(score.term)}>
                            {score.semester}
                        </Button>
                        {openTerms.includes(score.term) && (
                            <Table dataSource={score.scores} columns={columns} pagination={false} />
                        )}
                    </div>
                ))}

                <Divider style={{ color: 'blue', fontSize: '16px' }}>Lịch học</Divider>

                <Calendar title="Hello" onPanelChange={onPanelChange} />
            </Card>
        </div>
    );
}

export default DetailStudent;
