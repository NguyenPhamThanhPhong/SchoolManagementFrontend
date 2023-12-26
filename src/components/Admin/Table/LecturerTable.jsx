import React from 'react';
import { Table, Space, Button } from 'antd';

function LecturerTable({ handleDetail, lecturers }) {
    const dataSource = lecturers || []

    dataSource.map((item, index) => ({ ...item, stt: index + 1 }));
    //data ở đây console.log để thấy datasource

    const temp = [
        {
            key: '1',
            stt: 1,
            id: 'SV001',
            name: 'John Brown',
            dateOfBirth: '01/01/1990',
            email: 'john@example.com',
            sdt: '123456789',
            faculty: 'CNPM',
            personalInfo: {
                dateOfBirth: '01/01/1990',
            }
        },
        {
            key: '2',
            stt: 2,
            id: 'SV002',
            name: 'Jim Green',
            dateOfBirth: '02/02/1991',
            email: 'jim@example.com',
            sdt: '987654321',
            faculty: 'CNPM',
            personalInfo: {
                dateOfBirth: '01/01/1990',
            }
        },
        {
            key: '3',
            stt: 3,
            id: 'SV003',
            name: 'Joe Black',
            dateOfBirth: '03/03/1992',
            email: 'joe@example.com',
            sdt: '456789123',
            faculty: 'CNPM',
            personalInfo: {
                dateOfBirth: '01/01/1990',
            }
        },
    ];
    return (
        <Table
            columns={[
                {
                    title: 'key',
                    dataIndex: 'key',
                    key: 'key',
                },

                {
                    title: 'id',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'Ngày Sinh',
                    dataIndex: (personalInfo) => personalInfo.dateOfBirth,
                    key: (personalInfo) => personalInfo.dateOfBirth,
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
            dataSource={temp}
            rowSelection={{
                type: 'checkbox',
            }}
        />
    );
}

export default LecturerTable;
