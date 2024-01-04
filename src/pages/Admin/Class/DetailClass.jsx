import {
    Card,
    Table,
    Divider,
    Space,
    Typography,
    List,
    Breadcrumb,
    Descriptions,
    Badge,
    Tabs,
    Button,
    Input,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import StudentListTable from '../../../components/Admin/Table/StudentListTable';
import ExamListTable from '../../../components/Admin/Table/ExamListTable';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DateOfWeek } from '../../../data-api/index';
import { schoolClassApi } from '../../../data-api/index';

const Column = Table.Column;
const Title = Typography.Title;

function DetailClass() {
    const [editing, setEditing] = useState(false);

    const [examTableVisible, setExamTableVisible] = useState(false);
    const [documentVisible, setDocumentVisible] = useState(false);

    const [selectedSchoolClass, setSelectedSchoolClass] = useState({});

    let subjectId = useParams().id;

    const fetchSchoolClass = async (id) => {
        try {
            let response = await schoolClassApi.classGetbyId(id)
            console.log(response)
            if (!response.isError) {
                if (response.data.data !== null && response.data.data !== undefined)
                    setSelectedSchoolClass(response.data.data);
            }
            else
                console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchSchoolClass(subjectId);
    }, []);

    const toggleShowDocument = () => {
        setDocumentVisible(!documentVisible);
    };
    const toggleExamTable = () => {
        setExamTableVisible(!examTableVisible);
    };
    const classListData = [
        { id: 1, name: 'Student 1', progress: 80, midterm: 75, practice: 90, final: 85, GPA: 85 },
        { id: 2, name: 'Student 2', progress: 70, midterm: 80, practice: 85, final: 78, GPA: 78 },
    ];

    const examListData = [
        { name: 'Exam 1', date: '2023-01-01', room: 'Room A', duration: '2 hours', notes: 'Notes for Exam 1' },
        { name: 'Exam 2', date: '2023-02-01', room: 'Room B', duration: '3 hours', notes: 'Notes for Exam 2' },
    ];

    const items = [
        {
            key: '1',
            label: 'Class Name',
            children: selectedSchoolClass?.id + ' - ' + selectedSchoolClass?.name,
        },
        {
            key: '2',
            label: 'Lecturer',
            children: selectedSchoolClass?.lecturer?.name,
        },
        {
            key: '3',
            label: 'Schedule',
            children: DateOfWeek.GetDateOfWeek(selectedSchoolClass?.schedule?.dateOfWeek)
                + ' - ' + selectedSchoolClass?.schedule?.startTime
                + ' - ' + selectedSchoolClass?.schedule?.endTime,
        },
        {
            key: '4',
            label: 'Room',
            children: selectedSchoolClass?.roomName,
        },
        {
            key: '5',
            label: 'Program',
            children: selectedSchoolClass?.program,
        },
        {
            key: '6',
            label: 'Class type',
            children: selectedSchoolClass?.classType,
        },
        {
            key: '7',
            label: 'SubjectID',
            children: selectedSchoolClass?.subject?.id,
        },
        {
            key: '8',
            label: 'Semester',
            children: selectedSchoolClass?.semesterId,
        },
        {
            key: '9',
            label: 'something',
            children: '............................',
        },
    ];
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

    const onChange = (key) => {
        console.log(key);
    };
    const itemtab = [
        {
            key: '1',
            label: 'List Student',
            children: <StudentListTable />,
        },
        {
            key: '2',
            label: 'Exam Table',
            children: <ExamListTable />,
        },
        {
            key: '3',
            label: 'Document',
            children: (
                <Card style={{ flex: 2 }}>
                    <List>
                        <List.Item>
                            <Space direction="vertical">
                                <Title level={4}>Tuần 1-2</Title>
                                <Title level={5}>Ghi chú: ........</Title>
                                <Title level={5}>Tài liệu: TaiLieu.txt</Title>
                                <Divider />
                            </Space>
                        </List.Item>
                    </List>
                </Card>
            ),
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
                                <a href="/Class" className="breadcrumb-link">
                                    Class
                                </a>
                            ),
                        },
                        {
                            title: <span className="breadcrumb-link">Detail Class</span>,
                        },
                    ]}
                />
                <Divider style={{ color: 'blue', fontSize: '16px' }}>Chi tiết lớp</Divider>
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
            </Card>
            <Tabs
                defaultActiveKey="1"
                tabBarStyle={{ margin: '0 auto' }}
                items={itemtab}
                size="large"
                onChange={onChange}
            />
        </div>
    );
}

export default DetailClass;
