import React, { useState } from 'react';
import { Table, Button, Space } from 'antd';

function SemesterTable(props) {
    const [currentPage, setCurrentPage] = useState(1);

    let dataSource = props.dataSource;

    // If dataSource is not provided or is empty, create a default array
    if (!dataSource || dataSource.length === 0) {
        dataSource = Array.from({ length: 15 }, (_, index) => ({
            stt: index + 1,
            id: `Học kì ${index + 1} 2022 - 2023`,
            startTime: '1/1/2022',
            endTime: '30/06/2022',
        }));
    } else {
        // If dataSource is provided, map stt to the index + 1
        dataSource = dataSource.map((item, index) => ({
            ...item,
            stt: index + 1,
        }));
    }

    const pageSize = 10;
    const currentData = dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const semesterColumns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'id',
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
