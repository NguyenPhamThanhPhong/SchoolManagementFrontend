import React, { useState, useEffect } from 'react';
import {
    Card,
    Table,
    Divider,
    Descriptions,
    Badge,
    Breadcrumb,
    Button,
    Space,
    Calendar,
    Tabs,
    Avatar,
    Input,
    message
} from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, EditOutlined } from '@ant-design/icons';
import StudentScoreListTable from '../../../components/Admin/Table/StudentScoreListTable';
import StudentExamListTable from '../../../components/Admin/Table/StudentExamListTable';
import { useStudentContext, setCurrentStudent } from '../../../data-store';
import { StudentApi } from '../../../data-api';




function GenerateItems(id, username, password, email, personalInfo,) {
    return [
        {
            key: '1',
            label: 'Full name',
            children: personalInfo?.name,
        },
        {
            key: '2',
            label: 'MSSV',
            children: id,
        },
        {
            key: '3',
            label: 'Username',
            children: username,
        },
        {
            key: '4',
            label: 'Bậc đào tạo',
            children: personalInfo?.program,
        },
        {
            key: '5',
            label: 'Ngày sinh:',
            children: personalInfo?.dateofBirth,
        },
        {
            key: '6',
            label: 'Faculty',
            children: personalInfo?.facultyId,
        },
        {
            key: '7',
            label: 'Program',
            children: personalInfo?.program,
        },
        {
            key: '8',
            label: 'Giới tính',
            children: personalInfo?.gender,
        },
        {
            key: '9',
            label: 'Phone',
            children: personalInfo?.phone,
        },
    ]
}


function DetailStudent() {

    const [studentState, studentDispatch] = useStudentContext();

    let currentStudent = studentState?.currentStudent;

    const items = [
        {
            key: '1',
            label: 'Name',
            children: currentStudent?.personalInfo?.name,
        },
        {
            key: '2',
            label: 'Id',
            children: currentStudent?.id,
        },
        {
            key: '3',
            label: 'Gender',
            children: currentStudent?.personalInfo?.gender,
        },
        {
            key: '4',
            label: 'Username',
            children: currentStudent?.username,
        },
        {
            key: '5',
            label: 'Password',
            children: currentStudent?.password,
        },
        {
            key: '6',
            label: 'Email',
            children: currentStudent?.email,
        },
        {
            key: '7',
            label: 'Faculty',
            children: currentStudent?.personalInfo?.facultyId,
        },
        {
            key: '8',
            label: 'Program',
            children: currentStudent?.personalInfo?.program,
        },
        {
            key: '9',
            label: 'Khoa',
            children: currentStudent?.personalInfo?.dateOfBirth,
        },
    ];



    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    const onChange = (key) => {
        console.log(key);
    };

    const itemtab = [
        {
            key: '1',
            label: 'Bảng điểm',
            children: <StudentScoreListTable creditLogs={studentState?.currentStudent?.creditLogs} />,
        },
        {
            key: '2',
            label: 'Lịch học',
            children: <Calendar title="Hello" onPanelChange={onPanelChange} />,
        },
        {
            key: '3',
            label: 'Lịch thi',
            children: <StudentExamListTable />,
        },
    ];
    const renderDescriptions = () => {
        return <Descriptions bordered items={items} />;
    };
    return (
        <div>
            <Card>
                <Divider style={{ color: 'blue', fontSize: '16px' }}>Thông tin sinh viên</Divider>
                <Space
                    style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
                >
                    <Avatar
                        size={240}
                        bordered={true}
                        src={currentStudent?.personalInfo?.avatarUrl}
                    />
                    {renderDescriptions()}
                </Space>
                <Tabs
                    defaultActiveKey="1"
                    tabBarStyle={{ margin: '0 auto' }}
                    items={itemtab}
                    size="large"
                    onChange={onChange}
                />
            </Card>
        </div>
    );
}

export default DetailStudent;
