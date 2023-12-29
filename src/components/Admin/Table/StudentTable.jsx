import { React, useState, useEffect } from 'react';
import { Table, Space, Button } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { StudentApi } from '../../../data-api/index';
import {
    useStudentContext,
    setStudents, setCurrentStudent,
    appendStudent, removeStudent
} from '../../../data-store/index';


function StudentTable({ handleDetail }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [studentState, studentDispatch] = useStudentContext();
    let students = studentState.students

    const fetchStudent = async () => {
        try {
            let response = await StudentApi.studentGetManyRange(0, 50)
            if (!response.isError) {
                studentDispatch(setStudents(response.data.data));
            }
            else {

            }
        }
        catch (error) {
            console.log('Failed to fetch: ', error);
        }
    }
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

    const handleStudentDetail = (record) => {
        studentDispatch(setCurrentStudent(record));
    }

    useEffect(() => {
        fetchStudent();
    }, []);

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
                            <Button variant="contained" type="primary">
                                Edit
                            </Button>
                            <Button onClick={() => { deleteStudent(record.id) }} danger variant="contained" type="primary">
                                Delete
                            </Button>
                            <NavLink to={`/admin/student/detail-student/${record.id}`}>
                                <Button onClick={() => { handleStudentDetail(record) }} variant="contained">Details</Button>
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
