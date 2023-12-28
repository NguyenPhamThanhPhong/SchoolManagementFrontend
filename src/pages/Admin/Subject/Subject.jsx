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

    const showDrawer = (subject) => {
        setSelectedSubject(subject);
        setIsDrawerOpen(true);
    };

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
                        <Option value="hoahoc">Hoa Hoc</Option>
                        <Option value="vatly">Vat Ly</Option>
                    </Select>
                    <Search
                        placeholder="Search..."
                        onSearch={(value) => console.log(value)}
                        style={{ width: 200 }}
                        prefix={<SearchOutlined />}
                    />
                    <Button type="primary" onClick={() => { setIsCreateModalOpen(true) }}>
                        Thêm mới
                    </Button>
                </Space>
                <SubjectTable deleteSubject={deleteSubject} subjects={subjectState.subjects} showDrawer={showDrawer} />
            </Card>
            <CreateSubjectModal
                deleteSubject={deleteSubject}
                createSubject={createSubject}
                open={isCreateModalOpen}
                onCancel={() => { setIsCreateModalOpen(false) }}
                onOk={() => { setIsCreateModalOpen(false) }}
            />
            <ShowSubjectDrawer open={isDrawerOpen} onClose={onCloseDrawer} selectedSubject={selectedSubject} />
        </div>
    );
};

export default Subject;
