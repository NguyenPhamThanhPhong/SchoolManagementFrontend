import React, { useState } from 'react';
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

const Column = Table.Column;
const Title = Typography.Title;

function DetailClass() {
    const [editing, setEditing] = useState(false);

    const items = [
        {
            key: '1',
            label: 'Class Name',
            children: 'SE001.O11.PMCL Phuong Phap Phat Trien Phan Mem',
        },
        {
            key: '2',
            label: 'Lecturer',
            children: 'Dinh Anh Dung',
        },
        {
            key: '3',
            label: 'Schedule',
            children: 'Saturday : 7:00 - 9:00',
        },
        {
            key: '4',
            label: 'Room',
            children: 'C208',
        },
        {
            key: '5',
            label: 'Program',
            children: 'Chất lượng cao - CLC',
        },
        {
            key: '6',
            label: 'Class type',
            children: <Badge status="processing" text="Running" />,
        },
        {
            key: '7',
            label: 'SubjectID',
            children: 'SE001',
        },
        {
            key: '8',
            label: 'Semester',
            children: 'HKII 2022-2023',
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
