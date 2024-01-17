import React, { useEffect, useState } from 'react';
import { Space, Button, Input, Select, Card, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CreateStudentModal from '../../../components/Admin/Modal/CreateStudentModal';
import SendNotiStudentModal from '../../../components/Admin/Modal/SendNotiStudentModal';
import ShowStudentDrawer from '../../../components/Admin/Drawer/ShowStudentDrawer';
import StudentTable from '../../../components/Admin/Table/StudentTable';
import DeleteWarningModal from '../../../components/Admin/Modal/DeleteWarningModal';
import { useStudentContext, useFacultyContext, setStudents } from '../../../data-store';
import { StudentApi } from '../../../data-api/index';


const { Search } = Input;
const { Option } = Select;

const Student = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


    const [studentState, studentDispatch] = useStudentContext();
    const [facultyState, facultyDispatch] = useFacultyContext();

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const [selectedFaculty, setSelectedFaculty] = useState(null);


    const [searchText, setSearchText] = useState("");
    const [filtredStudents, setFiltredStudents] = useState(studentState?.students);

    const fetchStudent = async () => {
        try {
            let response = await StudentApi.studentGetManyRange(0, 50)
            if (!response.isError) {
                studentDispatch(setStudents(response.data.data));
            }
        }
        catch (error) {
            console.log('Failed to fetch: ', error);
        }
    }
    useEffect(() => {
        fetchStudent();
    }, []);

    const onSearch = () => {
        if (studentState !== null && studentState !== undefined) {
            let result = studentState.students.filter((student) => {
                let search = searchText.toLowerCase();
                search = search.replace(/\s/g, '').replace(/[^\w\s]/g, '');
                let name = student?.personalInfo?.name?.toLowerCase();
                name = name.replace(/\s/g, '').replace(/[^\w\s]/g, '');
                let id = student?.id?.toLowerCase();
                id = id.replace(/\s/g, '').replace(/[^\w\s]/g, '');

                return student.personalInfo?.facultyId?.includes(selectedFaculty) && (name.includes(search) || id.includes(search));
            })
            setFiltredStudents(result);
        }
    }

    useEffect(() => {
        setFiltredStudents(studentState.students);
    }, [studentState.students])

    useEffect(() => {
        onSearch();
    }, [selectedFaculty, searchText])

    const handleDeleteModalOpen = () => {
        if (selectedRows && selectedRows.length > 0)
            setIsDeleteModalOpen(true)
        else
            message.error("Please select at least one subject")
    }

    const handleDeleteMany = async () => {
        try {
            let response = await StudentApi.studentDeleteMany(selectedRowKeys);
            if (!response.isError) {
                studentDispatch(setStudents(studentState.students.filter((student) => !selectedRowKeys.includes(student.id))));
                message.success("Delete successfully");
                setSelectedRowKeys([]);
                setSelectedRows([]);
            }
            else {
                message.error("Delete failed");
            }
        }
        catch (error) {
            message.error("Delete failed");
        }
        setIsDeleteModalOpen(false);
    }
    return (
        <div>
            <Card>
                <div>
                    <h5>Quản lý sinh viên</h5>
                </div>
                <Space style={{ marginBottom: 16 }}>
                    <Select value={selectedFaculty}
                        onChange={(value) => { setSelectedFaculty(value) }} style={{ width: 150 }} placeholder="Select Khoa">
                        {
                            facultyState.faculties.map((faculty) => (
                                <Option key={faculty.id} value={faculty.id}>
                                    {faculty.id + "-" + faculty.name}
                                </Option>
                            ))
                        }
                    </Select>
                    <Search
                        placeholder="Search..."
                        onChange={(e) => { setSearchText(e.target.value) }}
                        value={searchText}
                        style={{ width: '30vw' }}
                        prefix={<SearchOutlined />}
                    />
                    <Button type="primary" onClick={() => { setIsCreateModalOpen(true) }}>
                        Thêm mới
                    </Button>
                    <Button danger variant="contained" type="primary" onClick={handleDeleteModalOpen}>
                        Delete
                    </Button>
                </Space>
                <StudentTable students={filtredStudents}
                    selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} setSelectedRows={setSelectedRows} />
            </Card>
            <DeleteWarningModal visible={isDeleteModalOpen} onOk={handleDeleteMany} onCancel={() => { setIsDeleteModalOpen(false) }}>
                {
                    selectedRows.map((subject, index) => {
                        return <p style={{ fontSize: '20px' }} >{index + 1 + ". "} {subject.id + "-" + subject.name}</p>
                    })
                }
            </DeleteWarningModal>
            <CreateStudentModal
                open={isCreateModalOpen}
                onOk={() => { setIsCreateModalOpen(false) }}
                onCancel={() => { setIsCreateModalOpen(false) }}
            />

        </div>
    );
};

export default Student;
