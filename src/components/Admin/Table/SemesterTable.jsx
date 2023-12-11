import React from 'react';
import { Table, Button, Space } from 'antd';

function SemesterTable() {
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
            dataSource={[
                { stt: 1, name: 'Học kì 1 2022 - 2023', start: '1/1/2022', end: '30/06/2022' },
                { stt: 2, name: 'Học kì 2 2022 - 2023', start: '1/7/2022', end: '31/12/2022' },
            ]}
            columns={semesterColumns}
        />
    );
}

export default SemesterTable;
