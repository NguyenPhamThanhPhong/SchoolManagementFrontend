import { React, useState } from 'react';
import { Table, Button, Space } from 'antd';
import { Link, NavLink } from 'react-router-dom';
function ClassTable({ showDrawer }) {
    const [currentPage, setCurrentPage] = useState(1);

    const dataSource = [
        {
            key: '1',
            class_id: '1',
            name: 'Hoa hoc',
            room: '101',
            program: 'John Doe',
            class_type: '30',
            subject_id: '90',
        },
        {
            key: '2',
            class_id: '2',
            name: 'Vat Ly',
            room: '102',
            program: 'Jane Smith',
            class_type: '25',
            subject_id: '120',
        },
        {
            key: '3',
            class_id: '2',
            name: 'Vat Ly',
            room: '102',
            program: 'Jane Smith',
            class_type: '25',
            subject_id: '120',
        },
        {
            key: '4',
            class_id: '2',
            name: 'Vat Ly',
            room: '102',
            program: 'Jane Smith',
            class_type: '25',
            subject_id: '120',
        },
        {
            key: '5',
            class_id: '2',
            name: 'Vat Ly',
            room: '102',
            program: 'Jane Smith',
            class_type: '25',
            subject_id: '120',
        },
        {
            key: '6',
            class_id: '2',
            name: 'Vat Ly',
            room: '102',
            program: 'Jane Smith',
            class_type: '25',
            subject_id: '120',
        },
    ];

    const columns = [
        {
            title: 'Class ID',
            dataIndex: 'class_id',
            key: 'class_id',
        },
        {
            title: 'Class Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Room',
            dataIndex: 'room',
            key: 'room',
        },
        {
            title: 'Program',
            dataIndex: 'program',
            key: 'program',
        },
        {
            title: 'Class Type',
            dataIndex: 'class_type',
            key: 'class_type',
        },
        {
            title: 'Subject ID',
            dataIndex: 'subject_id',
            key: 'subject_id',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary">Edit</Button>
                    <Button type="primary" danger>
                        Delete
                    </Button>
                    <NavLink to={`/admin/class/detail-class/${record.class_id}`}>
                        <Button type="default">Details</Button>
                    </NavLink>
                </Space>
            ),
        },
    ];

    const pageSize = 5;

    const currentData = dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <Table
            columns={columns}
            dataSource={currentData}
            pagination={{
                current: currentPage,
                total: dataSource.length,
                pageSize,
                onChange: handlePageChange,
            }}
            rowSelection={{
                type: 'checkbox',
            }}
        />
    );
}

export default ClassTable;
