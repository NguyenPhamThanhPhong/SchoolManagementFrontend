import React, { useEffect, useState } from 'react';
import { Space, Button, Input, Select, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ClassTable from '../../../components/Admin/Table/ClassTable';
import CreateClassModal from '../../../components/Admin/Modal/CreateClassModal';
import ShowClassDrawer from '../../../components/Admin/Drawer/ShowClassDrawer';
import { useSchoolClassContext, setSchoolClasses, removeSchoolClass } from '../../../data-store';
import { schoolClassApi } from '../../../data-api';


const { Search } = Input;
const { Option } = Select;

const Class = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    const [schoolClassState, schoolClassDispatch] = useSchoolClassContext();

    const [filtredClasses, setFiltredClasses] = useState(schoolClassState?.schoolClass);

    const onSearch = (value) => {
        let result = schoolClassState.schoolClasses.filter((schoolClass) => {
            // Convert both subject ID and search value to lowercase
            const schoolClassId = schoolClass?.id?.toLowerCase();
            const schoolClassName = schoolClass?.name?.toLowerCase();
            const searchValue = value.toLowerCase();

            const cleanSchoolClassId = schoolClassId.replace(/\s/g, '').replace(/[^\w\s]/g, '');
            const cleanSchoolClassName = schoolClassName.replace(/\s/g, '').replace(/[^\w\s]/g, '');
            const cleanSearchValue = searchValue.replace(/\s/g, '').replace(/[^\w\s]/g, '');

            return cleanSchoolClassId.includes(cleanSearchValue) || cleanSchoolClassName.includes(cleanSearchValue);
        });
        console.log(result);
        setFiltredClasses(result);
    }

    const fetchSchoolClasses = async (start, end) => {
        try {
            let response = await schoolClassApi.classGetManyRange(start, end)
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
    useEffect(() => {
        fetchSchoolClasses(0, 50);
    }, []);

    useEffect(() => {
        setFiltredClasses(schoolClassState?.schoolClasses);
    }, [schoolClassState?.schoolClasses]);




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
                        onSearch={(value) => { onSearch(value) }}
                        onChange={(e) => { onSearch(e.target.value) }}
                        style={{ width: 200 }}
                        prefix={<SearchOutlined />}
                    />
                    <Button type="primary" onClick={showModal}>
                        Thêm mới
                    </Button>
                </Space>
                <ClassTable showDrawer={showDrawer} schoolClasses={filtredClasses} />
            </Card>
            <CreateClassModal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
            <ShowClassDrawer open={isDrawerOpen} onClose={closeDrawer} selectedClass={selectedClass} />
        </div>
    );
};

export default Class;
