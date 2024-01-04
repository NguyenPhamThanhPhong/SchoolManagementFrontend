import React, { useState } from 'react';
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
} from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, EditOutlined } from '@ant-design/icons';
import LecturerExamListTable from '../../../components/Admin/Table/LecturerExamListTable';

const scoreListData = [
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

function DetailLecturer() {
    const [editing, setEditing] = useState(false);
    const [editedDescriptions, setEditedDescriptions] = useState([...items]);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        setEditing(false);
        console.log('Saved:', editedDescriptions);
    };

    const handleCancel = () => {
        setEditing(false);
        setEditedDescriptions([...items]);
    };
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    const onChange = (key) => {
        console.log(key);
    };
    const itemtab = [
        {
            key: '1',
            label: 'Danh sách lớp',
            children: <Table dataSource={scoreListData} columns={columns} pagination={false} />,
        },
        {
            key: '2',
            label: 'Lịch dạy',
            children: <Calendar title="Hello" onPanelChange={onPanelChange} />,
        },
        {
            key: '3',
            label: 'Lịch coi thi',
            children: <LecturerExamListTable />,
        },
    ];
    const renderDescriptions = () => {
        if (editing) {
            return (
                <Descriptions bordered>
                    {editedDescriptions.map((item) => (
                        <Descriptions.Item key={item.key} label={item.label}>
                            <Input
                                value={item.children}
                                onChange={(e) => {
                                    const updatedDescriptions = editedDescriptions.map((d) => {
                                        if (d.key === item.key) {
                                            return { ...d, children: e.target.value };
                                        }
                                        return d;
                                    });
                                    setEditedDescriptions(updatedDescriptions);
                                }}
                            />
                        </Descriptions.Item>
                    ))}
                </Descriptions>
            );
        }

        return <Descriptions bordered items={items} />;
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
                <Divider style={{ color: 'blue', fontSize: '16px' }}>Thông tin giảng viên</Divider>
                <Space
                    style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
                >
                    <Avatar
                        size={240}
                        bordered={true}
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                    <Space>
                        {editing ? (
                            <>
                                <Button type="primary" onClick={handleSave}>
                                    Save
                                </Button>
                                <Button onClick={handleCancel}>Cancel</Button>
                            </>
                        ) : (
                            <Button icon={<EditOutlined />} onClick={handleEdit}>
                                Edit
                            </Button>
                        )}
                    </Space>
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

export default DetailLecturer;
