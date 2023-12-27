import { React, useState } from 'react';
import { Table, Space, Button } from 'antd';
import { Link, NavLink } from 'react-router-dom';

function StudentTable({ handleDetail, students }) {
    const [currentPage, setCurrentPage] = useState(1);

    let temp = [{ ha: 'ha' }, { ha: 'ha' }, { ha: 'ha' }];
    if (!(students === undefined || students === null))
        temp = students;
    temp = temp.map((item, index) => ({ ...item, stt: index + 1 }));


    const dataSource = [
        {
            key: '1',
            stt: 1,
            mssv: 'SV001',
            name: 'John Brown',
            ngaySinh: '01/01/1990',
            email: 'john@example.com',
            sdt: '123456789',
            khoa: 'K42',
            lop: 'A1',
            faculty: 'CNPM',
        },
        {
            key: '2',
            stt: 2,
            mssv: 'SV002',
            name: 'Jim Green',
            ngaySinh: '02/02/1991',
            email: 'jim@example.com',
            sdt: '987654321',
            khoa: 'K42',
            lop: 'A2',
            faculty: 'CNPM',
        },
        {
            key: '3',
            stt: 3,
            mssv: 'SV003',
            name: 'Joe Black',
            ngaySinh: '03/03/1992',
            email: 'joe@example.com',
            sdt: '456789123',
            khoa: 'K42',
            lop: 'A3',
            faculty: 'CNPM',
        },
        {
            key: '4',
            stt: 3,
            mssv: 'SV003',
            name: 'Joe Black',
            ngaySinh: '03/03/1992',
            email: 'joe@example.com',
            sdt: '456789123',
            khoa: 'K42',
            lop: 'A3',
            faculty: 'CNPM',
        },
        {
            key: '5',
            stt: 3,
            mssv: 'SV003',
            name: 'Joe Black',
            ngaySinh: '03/03/1992',
            email: 'joe@example.com',
            sdt: '456789123',
            khoa: 'K42',
            lop: 'A3',
            faculty: 'CNPM',
        },
        {
            key: '6',
            stt: 3,
            mssv: 'SV003',
            name: 'Joe Black',
            ngaySinh: '03/03/1992',
            email: 'joe@example.com',
            sdt: '456789123',
            khoa: 'K42',
            lop: 'A3',
            faculty: 'CNPM',
        },
    ];
    const pageSize = 5;

    const currentData = dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <Table
            columns={[
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
                    title: 'Khóa',
                    dataIndex: 'khoa',
                    key: 'khoa',
                },
                {
                    title: 'Lớp',
                    dataIndex: 'lop',
                    key: 'lop',
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
                            <NavLink to={`/admin/student/detail-student/${record.mssv}`}>
                                <Button variant="contained">Details</Button>
                            </NavLink>
                            <Button variant="contained" type="link">
                                Reset
                            </Button>
                        </Space>
                    ),
                },
            ]}
            dataSource={currentData}
            pagination={{
                current: currentPage,
                total: dataSource.length,
                pageSize,
                onChange: handlePageChange,
            }}
            rowSelection={{
                type: 'checkbox',
            }}
        />
    );
}

export default StudentTable;
