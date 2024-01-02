import React, { useEffect, useState } from 'react';
import { Card, Button, Input, DatePicker, message, Space, Form, Select, Modal } from 'antd';
import SemesterTable from '../../../components/Admin/Table/SemesterTable';
import FacultyTable from '../../../components/Admin/Table/FacultyTable';
import CreateSemesterModal from '../../../components/Admin/Modal/CreateSemesterModal';
import CreateFacultyModal from '../../../components/Admin/Modal/CreateFacultyModal';
import AutoGenerateModal from '../../../components/Admin/Modal/AutoGenerateModal';

import {
    useSemesterContext, setSemesters, SemesterInitialState, appendSemester, removeSemester,
    useFacultyContext, setFaculties, FacultyInitialState, appendFaculty, removeFaculty
} from '../../../data-store';
import { SemesterApi, FacultyApi, Semester, Faculty, TextFilters } from '../../../data-api';


import { SearchOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Option } = Select;
function SemesterFaculty() {
    const [isSemesterModalOpen, setIsSemesterModalOpen] = useState(false);
    const [isModalFacultyOpen, setIsModalFacultyOpen] = useState(false);
    const [isAutoGenerateOpen, setIsAutoGenerateOpen] = useState(false);


    const [semesterState, semesterDispatch] = useSemesterContext();
    const [facultyState, facultyDispatch] = useFacultyContext();

    const [semesterSearch, setSemesterSearch] = useState('');
    const [facultySearch, setFacultySearch] = useState('');

    const [filteredSemesters, setFilteredSemesters] = useState(semesterState.semesters);
    const [filteredFaculties, setFilteredFaculties] = useState(facultyState.faculties);


    const onSearchSemester = async (value) => {
        setSemesterSearch(value);
        let result = semesterState.semesters.filter((semester) => {
            // Convert both semester ID and search value to lowercase
            const semesterId = semester.id.toLowerCase();
            const searchValue = value.toLowerCase();

            // Remove spaces and special characters from both semester ID and search value
            const cleanSemesterId = semesterId.replace(/\s/g, '').replace(/[^\w\s]/g, '');
            const cleanSearchValue = searchValue.replace(/\s/g, '').replace(/[^\w\s]/g, '');

            // Perform case-insensitive, space- and special character-ignoring search
            return cleanSemesterId.includes(cleanSearchValue);
        });

        setFilteredSemesters(result);
    }

    const onSearchFaculty = async (value) => {
        setFacultySearch(value);

        let result = facultyState.faculties.filter((faculty) => {
            // Convert both faculty ID, faculty name, and search value to lowercase
            const facultyId = faculty.id.toLowerCase();
            const facultyName = faculty.name.toLowerCase();
            const searchValue = value.toLowerCase();

            // Remove spaces and special characters from both faculty ID, faculty name, and search value
            const cleanFacultyId = facultyId.replace(/\s/g, '').replace(/[^\w\s]/g, '');
            const cleanFacultyName = facultyName.replace(/\s/g, '').replace(/[^\w\s]/g, '');
            const cleanSearchValue = searchValue.replace(/\s/g, '').replace(/[^\w\s]/g, '');

            // Perform case-insensitive, space- and special character-ignoring search
            return cleanFacultyId.includes(cleanSearchValue) || cleanFacultyName.includes(cleanSearchValue);
        });

        setFilteredFaculties(result);
    }


    const fetchSemesters = async () => {
        try {
            const response = await SemesterApi.getAll();
            if (!response.isError) {
                semesterDispatch(setSemesters(response.data.data));
            }
        } catch (error) {
            message.error('Fetch semester failed');
        }
    }
    const fetchFaculties = async () => {
        try {
            const response = await FacultyApi.getAll();
            if (!response.isError) {
                facultyDispatch(setFaculties(response.data.data));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteSingleSemester = async (id) => {
        try {
            let response = await SemesterApi.deleteSemester(id);
            console.log(response);
            if (!response.isError) {
                console.log(response.data.data);
                semesterDispatch(removeSemester(id));
                message.success('Delete semester successfully');
            }
            else {
                console.log(response);
                message.error(`Delete semester failed ${response?.data?.data}`);
            }
        }
        catch (error) {
            message.error(`Delete semester failed ${error}`);
        }
    }
    const handleDeleteSingleFaculty = async (id) => {
        console.log(id);
        try {
            let response = await FacultyApi.deleteFaculty(id);
            if (!response.isError) {
                facultyDispatch(removeFaculty(id));
                message.success('Delete faculty successfully');
            }
            else {
                message.error(`Delete faculty failed ${response?.data}`);
            }
        }
        catch (error) {
            message.error(`Delete faculty failed ${error}`);

        }
    }

    useEffect(() => {
        fetchSemesters();
        fetchFaculties();
    }, []);

    useEffect(() => {
        setFilteredSemesters(semesterState.semesters);
    }, [semesterState.semesters]);
    useEffect(() => {
        setFilteredFaculties(facultyState.faculties);
    }, [facultyState.faculties]);

    const showModalFaculty = () => {
        setIsModalFacultyOpen(true);
    };



    return (
        <div style={{ display: 'flex', gap: '16px' }}>
            <Card title="Semester" style={{ flex: 1, width: '50%' }}>
                <Space>
                    <Select style={{ width: 150 }} placeholder="Select Semester">
                        <Option value="K42">K42</Option>
                        <Option value="K43">K43</Option>
                    </Select>
                    <Search
                        placeholder="Search..."
                        value={semesterSearch}
                        onChange={(e) => { onSearchSemester(e.target.value) }}
                        style={{ width: 200 }}
                        prefix={<SearchOutlined />}
                    />
                    <Button type="primary" onClick={() => { setIsSemesterModalOpen(true) }}>
                        Create
                    </Button>
                    <Button type="primary" onClick={() => { setIsAutoGenerateOpen(true) }} >Auto Create</Button>
                </Space>
                <SemesterTable semesters={filteredSemesters} handleDelete={handleDeleteSingleSemester} />
                <CreateSemesterModal
                    isSemesterModalOpen={isSemesterModalOpen}
                    setIsSemesterModalOpen={setIsSemesterModalOpen}
                    semesters={semesterState.semesters} semesterDispatch={semesterDispatch}>
                </CreateSemesterModal>
                <AutoGenerateModal
                    semesters={semesterState.semesters}
                    semesterDispatch={semesterDispatch}
                    isAutoGenerateOpen={isAutoGenerateOpen}
                    setIsAutoGenerateOpen={setIsAutoGenerateOpen}
                >

                </AutoGenerateModal>
            </Card>

            <Card title="Faculty" style={{ flex: 1, width: '50%' }}>
                <Space>
                    <Select style={{ width: 150 }} placeholder="Select Faculty">
                        <Option value="K42">K42</Option>
                        <Option value="K43">K43</Option>
                    </Select>
                    <Search
                        placeholder="Search..."
                        value={facultySearch}
                        onChange={(e) => { onSearchFaculty(e.target.value) }}
                        style={{ width: 200 }}
                        prefix={<SearchOutlined />}
                    />
                    <Button type="primary" onClick={showModalFaculty}>
                        Create
                    </Button>
                </Space>
                <FacultyTable faculties={filteredFaculties} handleDelete={handleDeleteSingleFaculty} />
                <CreateFacultyModal
                    isModalFacultyOpen={isModalFacultyOpen}
                    setIsModalFacultyOpen={setIsModalFacultyOpen}
                    faculties={facultyState.faculties} facultyDispatch={facultyDispatch} />
            </Card>
        </div>
    );
}

export default SemesterFaculty;
