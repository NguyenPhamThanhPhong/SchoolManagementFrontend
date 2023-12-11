import React from 'react';
import { Table, Button, Space } from 'antd';

function FacultyTable() {
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
            dataSource={[
                { stt: 1, name: 'Khoa A', desc: 'Description' },
                { stt: 2, name: 'Khoa B', desc: 'Description 1' },
            ]}
            columns={facultyColumns}
        />
    );
}

export default FacultyTable;
