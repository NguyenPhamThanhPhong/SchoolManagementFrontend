import React, { useState } from 'react';
import { Space, Button, Input, Select, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ClassTable from '../../../components/Admin/Table/ClassTable';
import CreateClassModal from '../../../components/Admin/Modal/CreateClassModal';
import ShowClassDrawer from '../../../components/Admin/Drawer/ShowClassDrawer';

import {
    useSchoolClassContext,
    setSchoolClasses, appendSchoolClass, removeSchoolClass
} from '../../../data-store';
import { schoolClassApi, SchoolClassCreateRequest } from '../../../data-api';

const { Search } = Input;
const { Option } = Select;

const Class = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    const [schoolClassState, schoolClassDispatch] = useSchoolClassContext();

    const fetchSchoolClasses = async (start, end) => {
        try {
            let response = await schoolClassApi.getManyRange(start, end)
            if (!response.isError) {
                schoolClassDispatch(setSchoolClasses(response.data.data));
            }
            else
                console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    const deleteSchoolClass = async (id, prevUrls) => {
        try {
            let response = await schoolClassApi.delete(id)
            if (!response.isError) {
                schoolClassDispatch(removeSchoolClass(id));
            }
            else
                console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const viewSchoolClass = async (id) => {
        try {
            let response = await schoolClassApi.getOne(id)
            if (!response.isError) {
                setSelectedClass(response.data.data);
                setIsDrawerOpen(true);
            }
            else
                console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const showDrawer = (record) => {
        setSelectedClass(record);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        <div>
            <Card>
                <div>
                    <h5>Quản lý lớp học</h5>
                </div>
                <Space style={{ marginBottom: 16 }}>
                    <Select style={{ width: 150 }} placeholder="Select Name">
                        <Option value="it001">IT001</Option>
                        <Option value="it002">IT002</Option>
                    </Select>
                    <Search
                        placeholder="Search..."
                        onSearch={(value) => console.log(value)}
                        style={{ width: 200 }}
                        prefix={<SearchOutlined />}
                    />
                    <Button type="primary" onClick={showModal}>
                        Thêm mới
                    </Button>
                </Space>
                <ClassTable schoolClasses={schoolClassState.schoolClasses} showDrawer={showDrawer} />
            </Card>
            <CreateClassModal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
            <ShowClassDrawer open={isDrawerOpen} onClose={closeDrawer} selectedClass={selectedClass} />
        </div>
    );
};

export default Class;
