import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message } from 'antd';

function SemesterTable(props) {
    const [currentPage, setCurrentPage] = useState(1);

    const { handleDelete, handleEdit } = props;


    let dataSource = props.semesters || [];


    const pageSize = 10;
    const currentData = dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const semesterColumns = [
        {
            title: '',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'startTime',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: 'endTime',
            dataIndex: 'endTime',
            key: 'endTime',
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
            columns={semesterColumns}
            pagination={{
                current: currentPage,
                total: dataSource.length,
                pageSize,
                onChange: handlePageChange,
            }}
        />
    );
}

export default SemesterTable;
