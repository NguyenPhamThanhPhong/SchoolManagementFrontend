/* eslint-disable react/jsx-key */

import React, { useEffect, useState } from 'react';
import { Space, Button, Input, Select, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CreateSubjectModal from '../../../components/Admin/Modal/CreateSubjectModal';
import ShowSubjectDrawer from '../../../components/Admin/Drawer/ShowSubjectDrawer';
import SubjectTable from '../../../components/Admin/Table/SubjectTable';

import {
    useSubjectContext,
    setSubjects, appendSubject, removeSubject
} from '../../../data-store/index';
import { subjectApi } from '../../../data-api/index';

const { Search } = Input;
const { Option } = Select;

const Subject = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);


    const [subjectState, subjectDispatch] = useSubjectContext();

    const [subjectSearch, setSubjectSearch] = useState('');
    const [filteredSubjects, setFilteredSubjects] = useState(subjectState.subjects);

    const onSearchSubject = async (value) => {
        setSubjectSearch(value);
        let result = subjectState.subjects.filter((subject) => {
            // Convert both subject ID and search value to lowercase
            const subjectId = subject?.id?.toLowerCase();
            const subjectName = subject?.name?.toLowerCase();
            const searchValue = value.toLowerCase();

            const cleanSubjectId = subjectId.replace(/\s/g, '').replace(/[^\w\s]/g, '');
            const cleanSubjectName = subjectName.replace(/\s/g, '').replace(/[^\w\s]/g, '');
            const cleanSearchValue = searchValue.replace(/\s/g, '').replace(/[^\w\s]/g, '');

            return cleanSubjectId.includes(cleanSearchValue) || cleanSubjectName.includes(cleanSearchValue);
        });

        // let pre = subjectState.subjects.filter((subject) => {
        //     // Convert both subject ID and search value to lowercase
        //     const subjectId = subject.id.toLowerCase();
        //     const searchValue = value.toLowerCase();

        //     const cleanSubjectId = subjectId.replace(/\s/g, '').replace(/[^\w\s]/g, '');
        //     const cleanSearchValue = searchValue.replace(/\s/g, '').replace(/[^\w\s]/g, '');

        //     // Check if the subject ID or any prequisiteId matches the searchValue
        //     const matchesSearch = (subject.prequisiteIds && subject.prequisiteIds.some(prequisiteId => {
        //         const cleanPrequisiteId = prequisiteId.toLowerCase().replace(/\s/g, '').replace(/[^\w\s]/g, '');
        //         return cleanPrequisiteId.includes(cleanSearchValue);
        //     }));


        //     return matchesSearch;
        // });

        setFilteredSubjects(result);
    }

    const fetchSubjects = async () => {
        try {
            const response = await subjectApi.subjectManyRange(0, 50);
            if (!response.isError) {
                subjectDispatch(setSubjects(response.data.data));
            }
            else {
                console.log(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const deleteSubject = async (id) => {
        try {
            const response = await subjectApi.subjectDelete(id);
            if (!response.isError) {
                subjectDispatch(removeSubject(id));
            }
            else {
                console.log(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const createSubject = async (subject) => {
        try {
            const response = await subjectApi.subjectCreate(subject);
            if (!response.isError) {
                subjectDispatch(appendSubject(response.data.data));
                setIsCreateModalOpen(false);
            }
            else {
                console.log(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSubjects();
    }, []);
    useEffect(() => {
        setFilteredSubjects(subjectState.subjects);
    }, [subjectState.subjects]);

    const showDrawer = (subject) => {
        setSelectedSubject(subject);
        setIsDrawerOpen(true);
    };

    const handleEdit = (subject) => {
        setSelectedSubject(subject);
        setIsCreateModalOpen(true);
    }

    const onCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        <div>
            <Card>
                <div>
                    <h5>Quản lý môn học</h5>
                </div>
                <Space style={{ marginBottom: 16 }}>
                    <Select style={{ width: 150 }} placeholder="Select Name">
                        <Option value="pre">Prequisite subjects - Previous subjects</Option>
                        <Option value="idName">Subject ID - Subject Name</Option>
                    </Select>
                    <Search
                        placeholder="Search..."
                        value={subjectSearch}
                        onChange={(e) => { onSearchSubject(e.target.value) }}
                        style={{ width: 200 }}
                        prefix={<SearchOutlined />}
                    />
                    <Button type="primary" onClick={() => { setIsCreateModalOpen(true); setSelectedSubject(null); }}>
                        Thêm mới
                    </Button>
                </Space>
                <SubjectTable deleteSubject={deleteSubject} handleEdit={handleEdit} subjects={filteredSubjects} showDrawer={showDrawer} />
            </Card>
            <CreateSubjectModal
                deleteSubject={deleteSubject}
                createSubject={createSubject}
                selectedSubject={selectedSubject}
                open={isCreateModalOpen}
                onCancel={() => { setIsCreateModalOpen(false) }}
                onOk={() => { setIsCreateModalOpen(false) }}
            />
            <ShowSubjectDrawer open={isDrawerOpen} onClose={onCloseDrawer}
                selectedSubject={selectedSubject} />
        </div>
    );
};

export default Subject;
