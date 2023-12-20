import { React, useState } from 'react';
import { Table, Button, Space } from 'antd';

function FacultyTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const dataSource = [
        { stt: 1, name: 'Khoa A', desc: 'Description' },
        { stt: 2, name: 'Khoa B', desc: 'Description 1' },
        { stt: 3, name: 'Khoa B', desc: 'Description 1' },
        { stt: 4, name: 'Khoa B', desc: 'Description 1' },
        { stt: 5, name: 'Khoa B', desc: 'Description 1' },
        { stt: 6, name: 'Khoa B', desc: 'Description 1' },
        { stt: 7, name: 'Khoa B', desc: 'Description 1' },
        { stt: 8, name: 'Khoa B', desc: 'Description 1' },
        { stt: 9, name: 'Khoa B', desc: 'Description 1' },
        { stt: 10, name: 'Khoa B', desc: 'Description 1' },
        { stt: 11, name: 'Khoa B', desc: 'Description 1' },
    ];
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Desc',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary">Edit</Button>
                    <Button type="primary" danger>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];
    return (
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
    );
}

export default FacultyTable;
