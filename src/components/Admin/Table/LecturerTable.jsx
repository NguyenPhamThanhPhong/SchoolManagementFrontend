import React, { useState } from 'react';
import { Table, Space, Button, message } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import EditLecturerModal from '../Modal/EditLecturerModal';

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

function LecturerTable({ handleDetail, lecturers, handleDelete }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLecturer, setSelectedLecturer] = useState({});

    const showModal = (record) => {
        setSelectedLecturer(record);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setSelectedLecturer({});
        setIsModalOpen(false);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    let display = lecturers || temp;




    display = display.map((item, index) => { return { ...item, key: index, stt: index + 1 } })

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'MSGV',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: ['personalInfo', 'name'],
            key: 'id',
        },
        {
            title: 'Ngày Sinh',
            dataIndex: ['personalInfo', 'dateOfBirth'],
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'id',
        },
        {
            title: 'SDT',
            dataIndex: ['personalInfo', 'phone'],
            key: 'id',
        },
        {
            title: 'Faculty',
            dataIndex: ['personalInfo', 'facultyId'],
            key: 'id',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showModal(record)}>
                        Edit
                    </Button>
                    <Button danger variant="contained" type="primary" onClick={async () => { await handleDelete(record) }}>
                        Delete
                    </Button>
                    <NavLink to={`/admin/lecturer/detail-lecturer/${record.mssv}`}>
                        <Button variant="contained">Details</Button>
                    </NavLink>
                </Space>
            ),
        },
    ];


    return (
        <>
            <Table
                columns={columns}
                dataSource={display.map((item) => ({
                    ...item,
                    key: item.key,
                }))}
                rowSelection={{
                    type: 'checkbox',
                }}
            />
            <EditLecturerModal
                open={isModalOpen}
                lecturerData={selectedLecturer}
                onOk={handleOk}
                onCancel={handleCancel}
            /></>
    );
}

export default LecturerTable;
