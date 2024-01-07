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
    const [initialItems, setInitialItems] = useState([]);
    const [editedDescriptions, setEditedDescriptions] = useState([...initialItems]);
    const [editing, setEditing] = useState(false);

    const [studentState, studentDispatch] = useStudentContext();


    useEffect(() => {
        if (studentState?.currentStudent !== null && studentState?.currentStudent !== undefined) {
            const { id, username, password, email, personalInfo, } = studentState?.currentStudent;
            setInitialItems(GenerateItems(id, username, password, email, personalInfo));
        }
    }, [studentState?.currentStudent]);
    useEffect(() => {
        setEditedDescriptions([...initialItems]);
    }, [initialItems])


    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async () => {
        setEditing(false);
        try {

            const response = await StudentApi.studentUpdateInstance()
            if (!response.isError) {
                studentDispatch(setCurrentStudent(response.data.data));
                message.success("Cập nhật thông tin thành công");
            }
            else {
                message.error("Cập nhật thông tin thất bại");
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        setEditing(false);
        setEditedDescriptions([...initialItems]);
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

        return <Descriptions bordered items={editedDescriptions} />;
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
                        src={studentState?.currentStudent?.personalInfo?.avatarUrl}
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

export default DetailStudent;


// const PasswordItem = () => {
//     const [showPassword, setShowPassword] = useState(false);

//     const [studentState, studentDispatch] = useStudentContext();

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     return (
//         <Space>
//             {showPassword ? (
//                 <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
//             ) : (
//                 <EyeOutlined onClick={togglePasswordVisibility} />
//             )}
//             <span>{showPassword ? 'password' : '*********'}</span>
//         </Space>
//     );
// };