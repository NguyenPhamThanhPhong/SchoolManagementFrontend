import React, { useEffect, useState } from 'react';
import { Space, Button, Input, Select, Card, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CreateLecturerModal from '../../../components/Admin/Modal/CreateLecturerModal';
import SendNotiLecturerModal from '../../../components/Admin/Modal/SendNotiLecturerModal';
import ShowLecturerDrawer from '../../../components/Admin/Drawer/ShowLecturerDrawer';
import LecturerTable from '../../../components/Admin/Table/LecturerTable';


import { useLecturerContext, setLecturers, useFacultyContext, removeLecturer, setCurrentLecturer } from '../../../data-store';
import { lecturerApi } from '../../../data-api/lecturer-api';


const { Search } = Input;
const { Option } = Select;

const Lecturer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const [lecturerState, lecturerDispatch] = useLecturerContext();
    const [facultyState, facultyDispatch] = useFacultyContext();

    const [filtredLecturers, setFiltredLecturers] = useState(lecturerState.lecturers);
    const [searchText, setSearchText] = useState('');
    const [selectedFaculty, setSelectedFaculty] = useState(null);

    const fetchLecutrers = async (start, end) => {
        try {
            let response = await lecturerApi.getManyRange(start, end)
            if (!response.isError) {
                lecturerDispatch(setLecturers(response.data.data));
            }
            else
                console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        document.title = 'Quản lý giảng viên';
        fetchLecutrers(0, 50);
    }, []);


    const handleDelete = async (record) => {
        try {
            let response = await lecturerApi.lecturerDelete(record.id);
            if (!response.isError) {
                lecturerDispatch(removeLecturer(record.id));
                message.success('Deleted successfully');
            }
            else {
                message.error(response.data.message);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const onSearch = () => {
        if (lecturerState !== null && lecturerState !== undefined) {
            let result = lecturerState.lecturers.filter((lecturer) => {
                let search = searchText.toLowerCase();
                search = search.replace(/\s/g, '').replace(/[^\w\s]/g, '');
                let name = lecturer?.personalInfo?.name?.toLowerCase();
                name = name.replace(/\s/g, '').replace(/[^\w\s]/g, '');
                let id = lecturer?.id?.toLowerCase();
                id = id.replace(/\s/g, '').replace(/[^\w\s]/g, '');
                return lecturer.personalInfo?.facultyId?.includes(selectedFaculty || "") && (name.includes(search) || id.includes(search));
            })
            setFiltredLecturers(result);
        }
    }

    useEffect(() => {
        onSearch();
    }, [selectedFaculty, searchText])

    useEffect(() => {
        if (lecturerState?.lecturers !== null && lecturerState?.lecturers !== undefined) {
            setFiltredLecturers(lecturerState?.lecturers);
        }
        else
            setFiltredLecturers([]);
    }, [lecturerState?.lecturers])


    const handleDetail = (record) => {
        lecturerDispatch(setCurrentLecturer(record));
    };




    return (
        <div>
            <Card>
                <div>
                    <h5>Quản lý giảng viên</h5>
                </div>
                <Space style={{ marginBottom: 16 }}>
                    <Select style={{ width: 150 }} placeholder="Select Khoa" onSelect={setSelectedFaculty}>
                        {
                            facultyState?.faculties?.map((faculty) => {
                                return <Option key={faculty.id} value={faculty.id}>{faculty.name}</Option>
                            })
                        }
                    </Select>
                    <Search
                        placeholder="Search..."
                        onChange={(e) => { setSearchText(e.target.value) }}
                        style={{ width: 200 }}
                        prefix={<SearchOutlined />}
                    />
                    <Button type="primary" onClick={() => { setIsOpen(true) }}>
                        Gửi thông báo
                    </Button>
                    <Button type="primary" onClick={() => { setIsCreateModalOpen(true) }}>
                        Thêm mới
                    </Button>
                </Space>
                <LecturerTable lecturers={filtredLecturers} handleDetail={handleDetail} handleDelete={handleDelete} />
            </Card>
            <SendNotiLecturerModal
                open={isOpen}
                onOk={() => { setIsOpen(false) }}
                onCancel={() => { setIsOpen(false) }}
            />
            <CreateLecturerModal
                open={isCreateModalOpen}
                onOk={() => { setIsCreateModalOpen(false) }}
                onCancel={() => { setIsCreateModalOpen(false) }}
            />
        </div>
    );
};

export default Lecturer;
