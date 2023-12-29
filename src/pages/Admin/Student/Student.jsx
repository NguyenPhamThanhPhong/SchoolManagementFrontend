import React, { useEffect, useState } from 'react';
import { Space, Button, Input, Select, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CreateStudentModal from '../../../components/Admin/Modal/CreateStudentModal';
import SendNotiStudentModal from '../../../components/Admin/Modal/SendNotiStudentModal';
import ShowStudentDrawer from '../../../components/Admin/Drawer/ShowStudentDrawer';
import StudentTable from '../../../components/Admin/Table/StudentTable';



const { Search } = Input;
const { Option } = Select;

const Student = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);



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
                    <Select style={{ width: 150 }} placeholder="Select Khoa">
                        <Option value="K42">K42</Option>
                        <Option value="K43">K43</Option>
                    </Select>
                    <Search
                        placeholder="Search..."
                        onSearch={(value) => console.log(value)}
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
                <StudentTable handleDetail={handleDetail} />
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
