import { Card, Table, Divider, Descriptions, Badge, Breadcrumb, Button, Space, Calendar } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const { Column } = Table;

const scoreListData = [
    {
        term: '--HK I 2023-2024',
        ID: 'Se001',
        name: 'Lap trinh',
        progress: '9',
        midtearn: '9',
        practice: '9',
        final: '9',
        GPA: '9',
    },
    {
        term: '--HK II 2023-2024',
        ID: 'Se002',
        name: 'Lap trinh',
        progress: '9',
        midtearn: '9',
        practice: '9',
        final: '9',
        GPA: '9',
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
const items = [
    {
        key: '1',
        label: 'Họ và tên',
        children: 'Nguyen Hoang Long',
    },
    {
        key: '2',
        label: 'MSSV',
        children: '2122034556',
    },
    {
        key: '3',
        label: 'Password',
        children: <PasswordItem />,
    },
    {
        key: '4',
        label: 'Bậc đào tạo',
        children: 'Đại học',
    },
    {
        key: '5',
        label: 'Ngày sinh:',
        children: '2019-04-24 18:00:00',
    },
    {
        key: '6',
        label: 'Lớp sinh hoạt',
        children: <Badge status="processing" text="Running" />,
    },
    {
        key: '7',
        label: 'Program',
        children: 'CLC',
    },
    {
        key: '8',
        label: 'Giới tính',
        children: 'Nam',
    },
    {
        key: '9',
        label: 'Khoa',
        children: '............................',
    },
];

const columns = [
    { title: 'ID', dataIndex: 'ID', key: 'ID' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Progress', dataIndex: 'progress', key: 'progress' },
    { title: 'Midterm', dataIndex: 'midtearn', key: 'midtearn' },
    { title: 'Practice', dataIndex: 'practice', key: 'practice' },
    { title: 'Final', dataIndex: 'final', key: 'final' },
    { title: 'GPA', dataIndex: 'GPA', key: 'GPA' },
];

function DetailStudent() {
    const [openTerms, setOpenTerms] = useState([]);

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
                <Breadcrumb
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
                />
                <Divider style={{ color: 'blue', fontSize: '16px' }}>Thông tin sinh viên</Divider>
                <Descriptions bordered items={items} />

                <Divider style={{ color: 'blue', fontSize: '16px' }}>Kết quả học tập</Divider>
                {scoreListData.map((score) => (
                    <div key={score.term}>
                        <Button type="text" onClick={() => handleTermClick(score.term)}>
                            {score.term}
                        </Button>
                        {openTerms.includes(score.term) && (
                            <Table dataSource={[score]} columns={columns} pagination={false} />
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
