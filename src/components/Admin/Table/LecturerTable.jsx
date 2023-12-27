import React from 'react';
import { Table, Space, Button } from 'antd';

function LecturerTable({ handleDetail, lecturers }) {
    let dataSource = lecturers || []

    console.log(dataSource)

    const temp = [
        {
            stt: '1',
            id: 'SV001',
            email: 'john@example.com',
            sdt: '123456789',
            personalInfo: {
                dateOfBirth: '01/01/1990',
                name: 'John Brown',
                phone: '456789123',
                faculty: 'CNPM',

            }
        },
        {
            stt: '2',
            id: 'SV002',
            email: 'jim@example.com',
            sdt: '987654321',
            personalInfo: {
                dateOfBirth: '01/01/1990',
                name: 'Jim Green',
                phone: '45645234afd23',
                faculty: 'CNPM',

            }
        },
        {
            stt: '3',
            id: 'SV003',
            email: 'joe@example.com',
            personalInfo: {
                dateOfBirth: '01/01/1990',
                name: 'Joe Black',
                phone: '456789123',
                faculty: 'CNPM',
            }
        },
    ];
    return (
        <Table

            columns={[
                {
                    title: 'stt',
                    dataIndex: 'stt',
                    key: 'stt',
                },
                {
                    title: 'id',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: 'Name',
                    dataIndex: ['personalInfo', 'name'],
                    key: ['personalInfo', 'name'],
                },
                {
                    title: 'Ngày Sinh',
                    dataIndex: ['personalInfo', 'dateOfBirth'],
                    key: ['personalInfo', 'dateOfBirth'],
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email',
                },
                {
                    title: 'SDT',
                    dataIndex: ['personalInfo', 'phone'],
                    key: ['personalInfo', 'phone'],
                },
                {
                    title: 'Faculty',
                    dataIndex: ['personalInfo', 'faculty'],
                    key: ['personalInfo', 'faculty'],
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
            ]}
            dataSource={dataSource}
            rowSelection={{
                type: 'checkbox',
            }}
        />
    );
}

export default LecturerTable;
