import React, { useState } from 'react';
import { Table, Button, List, DatePicker, Drawer, Form, Input, Row, Col, Select, Space, Divider } from 'antd';
const { Option } = Select;
const SemesterTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
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

    const dataSource = [
        { stt: 1, name: 'Học kì 1 2022 - 2023', start: '1/1/2022', end: '30/06/2022' },
        { stt: 2, name: 'Học kì 2 2022 - 2023', start: '1/7/2022', end: '31/12/2022' },
        { stt: 3, name: 'Học kì 2 2022 - 2023', start: '1/7/2022', end: '31/12/2022' },
        { stt: 4, name: 'Học kì 2 2022 - 2023', start: '1/7/2022', end: '31/12/2022' },
        { stt: 5, name: 'Học kì 2 2022 - 2023', start: '1/7/2022', end: '31/12/2022' },
        { stt: 6, name: 'Học kì 2 2022 - 2023', start: '1/7/2022', end: '31/12/2022' },
        { stt: 7, name: 'Học kì 2 2022 - 2023', start: '1/7/2022', end: '31/12/2022' },
        { stt: 8, name: 'Học kì 2 2022 - 2023', start: '1/7/2022', end: '31/12/2022' },
        { stt: 9, name: 'Học kì 2 2022 - 2023', start: '1/7/2022', end: '31/12/2022' },
        { stt: 10, name: 'Học kì 2 2022 - 2023', start: '1/7/2022', end: '31/12/2022' },
        { stt: 11, name: 'Học kì 2 2022 - 2023', start: '1/7/2022', end: '31/12/2022' },
        { stt: 12, name: 'Học kì 2 2022 - 2023', start: '1/7/2022', end: '31/12/2022' },
        { stt: 13, name: 'Học kì 2 2022 - 2023', start: '1/7/2022', end: '31/12/2022' },
        { stt: 14, name: 'Học kì 2 2022 - 2023', start: '1/7/2022', end: '31/12/2022' },
        { stt: 15, name: 'Học kì 2 2022 - 2023', start: '1/7/2022', end: '31/12/2022' },
    ];

    const pageSize = 10;
    const currentData = dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const semesterColumns = [
        {
            title: 'Stt',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Start',
            dataIndex: 'start',
            key: 'start',
        },
        {
            title: 'End',
            dataIndex: 'end',
            key: 'end',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showDrawer(record)}>
                        Detail
                    </Button>
                    <Button type="primary" danger>
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
                columns={semesterColumns}
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
                    <Form.Item label="Start Date" name="start">
                        <DatePicker
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="End Date" name="end">
                        <DatePicker
                            style={{
                                width: '100%',
                            }}
                        />
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
};

export default SemesterTable;
