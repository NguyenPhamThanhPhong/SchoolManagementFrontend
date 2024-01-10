import { React, useEffect, useState } from 'react';
import { Table, Button, List, Drawer, Form, Input, Space, Divider, message } from 'antd';

import { FacultyApi, Faculty } from '../../../data-api';
import { useFacultyContext, setFaculties } from '../../../data-store';
import { useSubjectContext } from '../../../data-store';

function FacultyTable(props) {

    const [form] = Form.useForm();

    const [currentPage, setCurrentPage] = useState(1);

    const { handleDelete, handleEdit } = props;

    const [open, setOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const [facultyState, facultyDispatch] = useFacultyContext();
    const [subjectState, subjectDispatch] = useSubjectContext();

    const showDrawer = (record) => {
        setOpen(true);
        setSelectedRecord(record);
    };

    const onClose = () => {
        setOpen(false);
        setSelectedRecord(null);
    };

    useEffect(() => {
        if (selectedRecord !== null && selectedRecord !== undefined) {
            form.setFieldsValue({
                id: selectedRecord.id,
                name: selectedRecord.name,
                description: selectedRecord.description
            })
        }
    }, [selectedRecord])


    const handleUpdate = async (faculty) => {
        try {
            const response = await FacultyApi.updateFaculty(faculty)
            if (!response.isError) {
                const updatedFaculty = faculty;
                const { faculties } = facultyState;
                const index = faculties.findIndex((faculty) => faculty.id === updatedFaculty.id);
                if (index !== -1) {
                    faculties[index] = updatedFaculty;
                    facultyDispatch(setFaculties([...faculties]));
                    message.success('update faculty successfully');
                    return true;
                }
            }
            else {
                message.error(response.message);
            }
        }
        catch (error) {
            console.log(error);
            message.error('failed to update faculty')
        }
    }

    const handleSave = async () => {
        try {
            let { id, name, description } = form.getFieldsValue();
            const faculty = {
                id: id,
                name: name,
                description: description,
            }
            console.log(faculty);
            let isUpdated = await handleUpdate(faculty);
            if (isUpdated)
                onClose();
        }
        catch (error) {
            message.error('failed to save faculty')
        }
    }


    let filteredClasses = subjectState.subjects.filter((subject) => subject.facultyId === selectedRecord?.id);

    let classesData = filteredClasses.map((schoolClass, index) => {
        return {
            id: schoolClass?.id,
            name: schoolClass?.name,
        }
    });


    let dataSource = props.faculties || [];
    dataSource = dataSource.map((item, index) => ({ ...item, stt: index + 1, key: index + 1 }));

    const pageSize = 10;
    const currentData = dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const facultyColumns = [
        {
            title: 'Stt',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showDrawer(record)}>
                        Detail
                    </Button>
                    <Button onClick={async () => { await handleDelete(record.id) }} type="primary" danger>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Table
                dataSource={currentData}
                columns={facultyColumns}
                pagination={{
                    current: currentPage,
                    total: dataSource.length,
                    pageSize,
                    onChange: handlePageChange,
                }}
            />
            <Drawer
                title="Semester Detail"
                width={480}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={handleSave} type="primary">
                            Save
                        </Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="ID"
                        name="id"
                        style={{
                            width: '100%',
                        }}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
                        style={{
                            width: '100%',
                        }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="description"
                        style={{
                            width: '100%',
                        }}
                    >
                        <Input />
                    </Form.Item>
                </Form>
                <Divider>Danh sách lớp</Divider>
                <List
                    dataSource={classesData}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                key={index}
                                title={
                                    <div>
                                        <span><a href={`/admin/class/detail-class/${item.id}`}>{item.id + ' - ' + item?.name}</a></span>
                                    </div>
                                }
                                description={`Room: ${item.room}`}
                            />
                        </List.Item>
                    )}
                />
            </Drawer>
        </>
    );
}

export default FacultyTable;
