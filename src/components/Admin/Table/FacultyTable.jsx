import { React, useEffect, useState } from 'react';
import { Table, Button, List, DatePicker, Drawer, Form, Input, Row, Col, Select, Space, Divider } from 'antd';

function FacultyTable(props) {
    const [currentPage, setCurrentPage] = useState(1);

    const { handleDelete, handleEdit } = props;

    const [open, setOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const showDrawer = (record) => {
        setOpen(true);
        setSelectedRecord(record);
    };

    const onClose = () => {
        setOpen(false);
        setSelectedRecord(null);
    };


    let dataSource = props.faculties || [];
    dataSource = dataSource.map((item, index) => ({ ...item, stt: index + 1 }));


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
            render: (record) => (
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
    const classesData = [
        {
            key: '1',
            class_id: '1',
            name: 'SE001.O11.PMCL',
            room: '101',
            program: 'John Doe',
            class_type: '30',
            subject_id: '90',
        },
        {
            key: '2',
            class_id: '2',
            name: 'SE001.O12.PMCL',
            room: '102',
            program: 'Jane Smith',
            class_type: '25',
            subject_id: '120',
        },
        {
            key: '3',
            class_id: '3',
            name: 'SE001.O13.PMCL',
            room: '102',
            program: 'Jane Smith',
            class_type: '25',
            subject_id: '120',
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
                title="Faculty Detail"
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
                        <Button onClick={onClose} type="primary">
                            Save
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical">
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
                        label="Description"
                        name="desc"
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
                                title={<a href="/admin/class/detail">{item.name}</a>}
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
