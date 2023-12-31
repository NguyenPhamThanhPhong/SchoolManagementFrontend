import { React, useEffect, useState } from 'react';
import { Table, Button, Space } from 'antd';

function FacultyTable(props) {
    const [currentPage, setCurrentPage] = useState(1);

    const { handleDelete, handleEdit } = props;


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
                    <Button type="primary">Edit</Button>
                    <Button onClick={async () => { await handleDelete(record.id) }} type="primary" danger>
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
