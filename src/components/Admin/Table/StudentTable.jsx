import { React, useState, useEffect } from 'react';
import { Table, Space, Button } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { StudentApi } from '../../../data-api/index';
import EditStudentModal from '../Modal/EditStudentModal';
import {
    useStudentContext,
    setStudents, setCurrentStudent,
    appendStudent, removeStudent
} from '../../../data-store/index';


function StudentTable({ students, selectedRowKeys, setSelectedRowKeys, setSelectedRows }) {
    const [currentPage, setCurrentPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState({});

    const showModal = (record) => {
        setSelectedStudent(record);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setSelectedStudent({});
        setIsModalOpen(false);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const [studentState, studentDispatch] = useStudentContext();

    const deleteStudent = async (id) => {
        try {
            let response = await StudentApi.studentDelete(id)
            if (!response.isError) {
                studentDispatch(removeStudent(id.toString()));
            }
            else {
            }
        }
        catch (error) {
            console.log('Failed to fetch: ', error);
        }
    }

    const onSelectChange = (selectedKeys, selectedRows) => {
        setSelectedRowKeys(selectedKeys);
        setSelectedRows(selectedRows);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }


    const handleStudentDetail = (record) => {
        studentDispatch(setCurrentStudent(record));
    }


    let dataSource = students || []
    dataSource = dataSource.map((item, index) => ({ ...item, stt: index + 1 }));
    const pageSize = 5;
    const currentData = dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <>
            <Table
                columns={[
                    {
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id',
                    },
                    {
                        title: 'Name',
                        dataIndex: ['personalInfo', 'name'],
                        key: ['personalInfo', 'name'],
                    },
                    {
                        title: 'Date of birth',
                        dataIndex: ['personalInfo', 'dateOfBirth'],
                        key: ['personalInfo', 'dateOfBirth'],
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
                    },
                    {
                        title: 'Phone Numer',
                        dataIndex: ['personalInfo', 'phone'],
                        key: ['personalInfo', 'phone'],
                    },
                    {
                        title: 'Faculty',
                        dataIndex: ['personalInfo', 'facultyId'],
                        key: ['personalInfo', 'facultyId'],
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (_, record) => (
                            <Space size="middle">
                                <Button type="primary" onClick={() => showModal(record)}>
                                    Edit
                                </Button>
                                <Button onClick={() => { deleteStudent(record.id) }} danger variant="contained" type="primary">
                                    Delete
                                </Button>
                                <NavLink to={`/admin/student/detail-student/${record.id}`}>
                                    <Button onClick={() => { handleStudentDetail(record) }} variant="contained">Details</Button>
                                </NavLink>
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
                    ...rowSelection
                }}
                rowKey='id'
            />
            <EditStudentModal
                open={isModalOpen}
                studentData={selectedStudent}
                onOk={handleOk}
                onCancel={handleCancel}
            />
        </>
    );
}

export default StudentTable;
