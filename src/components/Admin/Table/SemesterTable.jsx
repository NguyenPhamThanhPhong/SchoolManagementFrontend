import { React, useState } from 'react';
import { Table, Button, Space } from 'antd';

function SemesterTable(props) {
    const [currentPage, setCurrentPage] = useState(1);

    let dataSource = props.dataSource;
    if (props.dataSource === null || props.dataSource === undefined)
        dataSource = [
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
