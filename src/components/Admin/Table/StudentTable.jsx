import { React, useState } from 'react';
import { Table, Space, Button } from 'antd';
import { Link, NavLink } from 'react-router-dom';

function StudentTable({ handleDetail, students, deleteStudent }) {



    const [currentPage, setCurrentPage] = useState(1);

    let dataSource = students || []
    dataSource = dataSource.map((item, index) => ({ ...item, stt: index + 1 }));
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
                    dataIndex: 'sdt',
                    key: 'sdt',
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
                            <Button onClick={() => { deleteStudent(record.id) }} danger variant="contained" type="primary">
                                Delete
                            </Button>
                            <NavLink to={`/admin/student/detail-student/${record.id}`}>
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
