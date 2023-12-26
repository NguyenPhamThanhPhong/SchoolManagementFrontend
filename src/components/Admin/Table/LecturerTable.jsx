import React from 'react';
import { Table, Space, Button } from 'antd';

const temp = [
    {
        key: '1',
        stt: 1,
        mssv: 'SV001',
        name: 'John Brown',
        ngaySinh: '01/01/1990',
        email: 'john@example.com',
        sdt: '123456789',
        faculty: 'CNPM',
        personalInfo: {
            dateofBirth: '01/01/1994',
        },
    },
    {
        key: '2',
        stt: 2,
        mssv: 'SV002',
        name: 'Jim Green',
        ngaySinh: '02/02/1991',
        email: 'jim@example.com',
        sdt: '987654321',
        faculty: 'CNPM',
        personalInfo: {
            dateofBirth: '01/01/1995',
        },
    },
    {
        key: '3',
        stt: 3,
        mssv: 'SV003',
        name: 'Joe Black',
        ngaySinh: '03/03/1992',
        email: 'joe@example.com',
        sdt: '456789123',
        faculty: 'CNPM',
        personalInfo: {
            dateofBirth: '01/01/1996',
        },
    },
];

function LecturerTable({ handleDetail }) {
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Mssv',
            dataIndex: 'mssv',
            key: 'mssv',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngày Sinh',
            dataIndex: 'ngaySinh',
            key: 'ngaySinh',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'SDT',
            dataIndex: 'sdt',
            key: 'sdt',
        },
        {
            title: 'Faculty',
            dataIndex: 'faculty',
            key: 'faculty',
        },
        {
            title: 'Date of Birth',
            dataIndex: ['personalInfo', 'dateofBirth'],
            key: 'dateofBirth',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button variant="contained" type="primary">
                        Edit
                    </Button>
                    <Button danger variant="contained" type="primary">
                        Delete
                    </Button>
                    <Button variant="contained" onClick={() => handleDetail(record)}>
                        Detail
                    </Button>
                    <Button variant="contained" type="link">
                        Reset
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={temp.map((item) => ({
                ...item,
                key: item.key,
                action: (
                    <Space size="middle">
                        <Button variant="contained" type="primary">
                            Edit
                        </Button>
                        <Button danger variant="contained" type="primary">
                            Delete
                        </Button>
                        <Button variant="contained" onClick={() => handleDetail(item)}>
                            Detail
                        </Button>
                        <Button variant="contained" type="link">
                            Reset
                        </Button>
                    </Space>
                ),
            }))}
            rowSelection={{
                type: 'checkbox',
            }}
        />
    );
}

export default LecturerTable;
