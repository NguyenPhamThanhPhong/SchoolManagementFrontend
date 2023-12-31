import React, { useState } from 'react';
import { Card, Button, Input, DatePicker, message, Space, Select, Modal } from 'antd';
import SemesterTable from '../../../components/Admin/Table/SemesterTable';
import FacultyTable from '../../../components/Admin/Table/FacultyTable';
import { SearchOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Option } = Select;
function SemesterFaculty() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalFacultyOpen, setIsModalFacultyOpen] = useState(false);

    const showModalSemester = () => {
        setIsModalOpen(true);
    };
    const showModalFaculty = () => {
        setIsModalFacultyOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleModalFacultyOk = () => {
        setIsModalFacultyOpen(false);
    };

    const handleModalFacultyCancel = () => {
        setIsModalFacultyOpen(false);
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
                        onSearch={(value) => console.log(value)}
                        style={{ width: 200 }}
                        prefix={<SearchOutlined />}
                    />
                    <Button type="primary" onClick={showModalSemester}>
                        Create
                    </Button>
                    <Button type="primary">Auto Create</Button>
                </Space>
                <SemesterTable />
                <Modal title="Create Semester" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Space direction="vertical" size={16} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '20%' }}>Name:</label>
                            <Input style={{ width: '80%' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '20%' }}>Start:</label>
                            <DatePicker style={{ width: '80%' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '20%' }}>End:</label>
                            <DatePicker style={{ width: '80%' }} />
                        </div>
                    </Space>
                </Modal>
            </Card>

            <Card title="Faculty" style={{ flex: 1, width: '50%' }}>
                <Space>
                    <Select style={{ width: 150 }} placeholder="Select Faculty">
                        <Option value="K42">K42</Option>
                        <Option value="K43">K43</Option>
                    </Select>
                    <Search
                        placeholder="Search..."
                        onSearch={(value) => console.log(value)}
                        style={{ width: 200 }}
                        prefix={<SearchOutlined />}
                    />
                    <Button type="primary" onClick={showModalFaculty}>
                        Create
                    </Button>
                </Space>
                <FacultyTable />
                <Modal
                    title="Create Semester"
                    open={isModalFacultyOpen}
                    onOk={handleModalFacultyOk}
                    onCancel={handleModalFacultyCancel}
                >
                    <Space direction="vertical" size={16} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '20%' }}>Name:</label>
                            <Input style={{ width: '80%' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '20%' }}>Desciption:</label>
                            <Input style={{ width: '80%' }} />
                        </div>
                    </Space>
                </Modal>
            </Card>
        </div>
    );
}

export default SemesterFaculty;
