import React, { useState } from 'react';
import { Card, Button, Input, DatePicker, Form, Space, Select, Modal, Table } from 'antd';
import RegistrationTable from '../../../components/Admin/Table/RegistrationTable';
import { SearchOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Option } = Select;
function Registration() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tableData, setTableData] = useState([]);

    const showModalRegistration = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const dataSource = [
        {
            key: '1',
            id: '1',
            class_name: 'Huong dt',
            subject: 'Class 1',
        },
        {
            key: '2',
            id: '2',
            class_name: 'lap trinh',
            subject: 'Class 2',
        },
    ];

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Class Name',
            dataIndex: 'class_name',
            key: 'class_name',
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
        },
    ];

    const handleClassChange = (value) => {
        // Find the selected class in dataSource
        const selectedClassData = dataSource.find((item) => item.subject === value);

        // Update the tableData with the selected class information without removing existing data
        if (selectedClassData) {
            setTableData((prevData) => [...prevData, selectedClassData]);
        }
    };
    return (
        <div style={{ display: 'flex', gap: '16px' }}>
            <Card title="Registration" style={{ flex: 1, width: '50%' }}>
                <Space>
                    <Select style={{ width: 150 }} placeholder="Select Registration">
                        <Option value="K42">K42</Option>
                        <Option value="K43">K43</Option>
                    </Select>
                    <Search
                        placeholder="Search..."
                        onSearch={(value) => console.log(value)}
                        style={{ width: 200 }}
                        prefix={<SearchOutlined />}
                    />
                    <Button type="primary" onClick={showModalRegistration}>
                        Create
                    </Button>
                    <Button type="primary">Auto Create</Button>
                </Space>
                <RegistrationTable />
                <Modal
                    title="Create Registration"
                    width={720}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
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
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '20%' }}>Semester:</label>
                            <Select style={{ width: '80%' }} allowClear>
                                <Option value="semester1">semester1</Option>
                                <Option value="semester2">semester2</Option>
                                <Option value="semester3">semester3</Option>
                            </Select>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '20%' }}>Classes:</label>
                            <Select style={{ width: '80%' }} allowClear onChange={handleClassChange}>
                                <Option value="Class 1">Class 1</Option>
                                <Option value="Class 2">Class 2</Option>
                                <Option value="Class 3">Class 3</Option>
                            </Select>
                        </div>
                        <Table dataSource={tableData} columns={columns} pagination={false} />
                    </Space>
                </Modal>
            </Card>
        </div>
    );
}

export default Registration;
