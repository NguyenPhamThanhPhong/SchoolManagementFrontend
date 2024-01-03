import React, { useEffect, useState } from 'react';
import { Space, Button, Input, Select, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CreateStudentModal from '../../../components/Admin/Modal/CreateStudentModal';
import SendNotiStudentModal from '../../../components/Admin/Modal/SendNotiStudentModal';
import ShowStudentDrawer from '../../../components/Admin/Drawer/ShowStudentDrawer';
import StudentTable from '../../../components/Admin/Table/StudentTable';
import { useStudentContext, useFacultyContext, setStudents } from '../../../data-store';
import { StudentApi } from '../../../data-api/index';


const { Search } = Input;
const { Option } = Select;

const Student = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);


    const [studentState, studentDispatch] = useStudentContext();
    const [facultyState, facultyDispatch] = useFacultyContext();

    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [filtredStudents, setFiltredStudents] = useState(studentState?.students);

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

            // setFiltredStudents(studentState.students.filter((student) => student.name?.includes(searchText) && student.facultyId?.includes(selectedFaculty)));
        }
    }

    useEffect(() => {
        setFiltredStudents(studentState.students);
    }, [studentState.students])

    useEffect(() => {
        onSearch();
    }, [selectedFaculty, searchText])

    const handleDetail = (record) => {
        setSelectedStudent(record);
        setIsDetailDrawerOpen(true);
    };



    const showNotificationModal = () => {
        setIsOpen(true);
    };

    const showCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleNotificationModalOk = () => {
        setIsOpen(false);
    };

    const handleNotificationModalCancel = () => {
        setIsOpen(false);
    };

    const handleCreateModalOk = () => {
        setIsCreateModalOpen(false);
    };

    const handleCreateModalCancel = () => {
        setIsCreateModalOpen(false);
    };

    const handleSendNotification = () => {
        showNotificationModal();
    };

    const handleCreate = () => {
        showCreateModal();
    };
    const closeDrawer = () => {
        setIsDetailDrawerOpen(false);
    };

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
                        style={{ width: 200 }}
                        prefix={<SearchOutlined />}
                    />
                    <Button type="primary" onClick={handleSendNotification}>
                        Gửi thông báo
                    </Button>
                    <Button type="primary" onClick={handleCreate}>
                        Thêm mới
                    </Button>
                </Space>
                <StudentTable handleDetail={handleDetail} students={filtredStudents} />
            </Card>
            <SendNotiStudentModal
                open={isOpen}
                onOk={handleNotificationModalOk}
                onCancel={handleNotificationModalCancel}
            />
            <CreateStudentModal
                open={isCreateModalOpen}
                onOk={handleCreateModalOk}
                onCancel={handleCreateModalCancel}
            />
            <ShowStudentDrawer onClose={closeDrawer} open={isDetailDrawerOpen} selectedStudent={selectedStudent} />
        </div>
    );
};

export default Student;
